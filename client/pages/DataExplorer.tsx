import { useState } from "react";
import { Download, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface DataRow {
  id: string;
  date: string;
  product: string;
  sales: number;
  quantity: number;
  region: string;
  category: string;
}

export default function DataExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  // Sample processed data
  const allData: DataRow[] = [
    {
      id: "1",
      date: "2024-01-01",
      product: "Product A",
      sales: 5000,
      quantity: 25,
      region: "North",
      category: "Electronics",
    },
    {
      id: "2",
      date: "2024-01-01",
      product: "Product B",
      sales: 3500,
      quantity: 18,
      region: "South",
      category: "Clothing",
    },
    {
      id: "3",
      date: "2024-01-02",
      product: "Product A",
      sales: 6200,
      quantity: 31,
      region: "East",
      category: "Electronics",
    },
    {
      id: "4",
      date: "2024-01-02",
      product: "Product C",
      sales: 4100,
      quantity: 20,
      region: "West",
      category: "Home",
    },
    {
      id: "5",
      date: "2024-01-03",
      product: "Product B",
      sales: 3800,
      quantity: 19,
      region: "North",
      category: "Clothing",
    },
    {
      id: "6",
      date: "2024-01-03",
      product: "Product A",
      sales: 5900,
      quantity: 29,
      region: "South",
      category: "Electronics",
    },
    {
      id: "7",
      date: "2024-01-04",
      product: "Product C",
      sales: 4500,
      quantity: 23,
      region: "East",
      category: "Home",
    },
    {
      id: "8",
      date: "2024-01-04",
      product: "Product B",
      sales: 4200,
      quantity: 21,
      region: "West",
      category: "Clothing",
    },
    {
      id: "9",
      date: "2024-01-05",
      product: "Product A",
      sales: 6800,
      quantity: 34,
      region: "North",
      category: "Electronics",
    },
    {
      id: "10",
      date: "2024-01-05",
      product: "Product C",
      sales: 4800,
      quantity: 24,
      region: "South",
      category: "Home",
    },
  ];

  // Filter data
  let filteredData = allData.filter((row) => {
    const matchesSearch =
      row.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.date.includes(searchTerm) ||
      row.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProduct =
      selectedProduct === "all" || row.product === selectedProduct;
    const matchesRegion =
      selectedRegion === "all" || row.region === selectedRegion;
    return matchesSearch && matchesProduct && matchesRegion;
  });

  // Sort data
  if (sortBy === "sales") {
    filteredData = [...filteredData].sort((a, b) => b.sales - a.sales);
  } else if (sortBy === "quantity") {
    filteredData = [...filteredData].sort((a, b) => b.quantity - a.quantity);
  } else {
    filteredData = [...filteredData].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }

  const handleDownload = async () => {
    try {
      const response = await fetch("/api/download-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: filteredData, format: "csv" }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "processed_sales_data.csv";
        a.click();
        toast.success("Data downloaded successfully");
      }
    } catch (error) {
      toast.error("Error downloading data");
      console.error(error);
    }
  };

  const uniqueProducts = Array.from(new Set(allData.map((d) => d.product)));
  const uniqueRegions = Array.from(new Set(allData.map((d) => d.region)));

  const stats = {
    totalSales: filteredData.reduce((sum, row) => sum + row.sales, 0),
    totalQuantity: filteredData.reduce((sum, row) => sum + row.quantity, 0),
    avgSales:
      filteredData.length > 0
        ? Math.round(
            filteredData.reduce((sum, row) => sum + row.sales, 0) /
              filteredData.length,
          )
        : 0,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Data Explorer</h1>
        <p className="text-slate-600 mt-2">
          View, filter, and download your cleaned and processed sales data
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Product, date, region..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Product</Label>
              <Select
                value={selectedProduct}
                onValueChange={setSelectedProduct}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  {uniqueProducts.map((product) => (
                    <SelectItem key={product} value={product}>
                      {product}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Region</Label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {uniqueRegions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date (Newest)</SelectItem>
                  <SelectItem value="sales">Sales (Highest)</SelectItem>
                  <SelectItem value="quantity">Quantity (Highest)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">
              ${stats.totalSales.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Quantity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {stats.totalQuantity}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Average Sale</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">
              ${stats.avgSales.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Processed Sales Data</CardTitle>
              <CardDescription>
                Showing {filteredData.length} of {allData.length} records
              </CardDescription>
            </div>
            <Button onClick={handleDownload} className="flex gap-2">
              <Download className="w-4 h-4" />
              Download CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left p-3 font-semibold text-slate-700">
                    Date
                  </th>
                  <th className="text-left p-3 font-semibold text-slate-700">
                    Product
                  </th>
                  <th className="text-left p-3 font-semibold text-slate-700">
                    Region
                  </th>
                  <th className="text-left p-3 font-semibold text-slate-700">
                    Category
                  </th>
                  <th className="text-right p-3 font-semibold text-slate-700">
                    Sales
                  </th>
                  <th className="text-right p-3 font-semibold text-slate-700">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >
                    <td className="p-3 text-slate-700">{row.date}</td>
                    <td className="p-3 text-slate-700">{row.product}</td>
                    <td className="p-3 text-slate-700">{row.region}</td>
                    <td className="p-3 text-slate-700">{row.category}</td>
                    <td className="p-3 text-right text-slate-900 font-semibold">
                      ${row.sales.toLocaleString()}
                    </td>
                    <td className="p-3 text-right text-slate-900 font-semibold">
                      {row.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
