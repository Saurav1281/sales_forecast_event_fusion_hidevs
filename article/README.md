![head image](https://github.com/snyamson/P4-SalesSense-Interactive-Sales-Forecasting-Web-Application/assets/58486437/59f4b62c-8647-449e-a430-25b6bd274d6b)
# SalesSense: Revolutionizing Sales Forecasting with Machine Learning

In today's dynamic business landscape, the ability to predict sales accurately is a game-changer. It's the key to optimizing inventory, boosting profits, and making data-driven decisions. That's where SalesSense comes into play. It's a cutting-edge web application developed to provide real-time interactive sales forecasts. This article takes you on a journey through the development of SalesSense, showcasing the technology stack, features, and the process of integrating machine learning models.

![logo](https://github.com/snyamson/P4-SalesSense-Interactive-Sales-Forecasting-Web-Application/assets/58486437/63fbb105-9b26-40b6-8e1a-cd3fee875edf)

## Introduction

SalesSense is an intuitive web application powered by cutting-edge machine learning models that provide real-time sales forecasts. It simplifies the process of predicting sales, making it accessible to businesses of all sizes. This project began with a vision: to help companies make data-driven decisions effortlessly. Let's dive into the development journey and explore the remarkable features of SalesSense.

## The Need for Sales Forecasting

Accurate sales forecasting is critical for a business's survival and success. It helps in inventory management, marketing strategies, and financial planning. However, it can be a challenging task, especially with large datasets and dynamic markets. SalesSense addresses this need by harnessing the power of machine learning to provide real-time sales predictions.

## The Technology Stack

SalesSense relies on a robust technology stack to deliver real-time sales forecasts. Here are the key technologies used in the development of the application:

- Streamlit: A Python web application framework that makes it easy to build interactive and data-driven applications.

- Pandas: A popular library for data manipulation and analysis.

- Scikit-Learn: A machine learning library that simplifies the implementation of various algorithms.

- XGBoost: A powerful gradient boosting library for machine learning tasks.

- Joblib: Used for serialization and deserialization of machine learning models.

- HTML/CSS: For styling and layout customization.

## Development Process

1. ### Data Collection, Preprocessing and Model Training

The journey of SalesSense begins with data. The data used was from the previous project titled "Predictive Analytics in Retail: A Deep Dive into Forecasting at Corporation Favorita". The project utilized historical sales data, including various factors that could impact sales, such as family of the store, day of the week, promotional items, previous sales, and rolling mean.  The state-of-the-art XGBoost machine learning model was trained on the historical sales data, with a rigorous process to learn the intricate relationships between various factors and sales outcomes. This forms the foundation for accurate predictions.

2. ### Preprocessor and Model Exports

The Preprocessor and the XGBoost model were exported from the notebook using Joblib and made available to be used for further preprocessing tasks and forecasting in the app.  

![prep 1](https://github.com/snyamson/P4-SalesSense-Interactive-Sales-Forecasting-Web-Application/assets/58486437/85f395ea-2627-4c6c-8663-3ff0800b57d0)
![prep 2](https://github.com/snyamson/P4-SalesSense-Interactive-Sales-Forecasting-Web-Application/assets/58486437/2a142f10-0724-487b-aab3-b1f5a46d61d7)

3. ### Building the User Interface

The user interface serves as SalesSense's front end, built using Streamlit to offer an interactive and intuitive experience. This design enables users to effortlessly input their data and obtain real-time sales predictions.

The application is structured into components and utilities. Components handle the user interface (UI), while utilities manage data processing and logic.

The UI renders a form allowing users to input the data required for predictions (related to the store's family, day of the week, date, items on promotion, previous sales, and rolling mean).

![home](https://github.com/snyamson/P4-SalesSense-Interactive-Sales-Forecasting-Web-Application/assets/58486437/714d7714-8fba-428d-9b25-b47e7f4d7946)
![about app](https://github.com/snyamson/P4-SalesSense-Interactive-Sales-Forecasting-Web-Application/assets/58486437/37febbe5-8822-4f2f-b12a-96f95bb8dbee)

The Sidebar features store family categories used for model training, along with an app information section.

4. ### Building the Logic

Upon submission, the data_preprocessor function is invoked, initiating the data processing explained in the following section:

![data prep](https://github.com/snyamson/P4-SalesSense-Interactive-Sales-Forecasting-Web-Application/assets/58486437/a02e29e2-dacc-4d34-a7e8-9b4ac59fe16a)

Code Explanation:

`preprocessor` and `model` are loaded using `joblib.load` from model files. These components are essential for the model's prediction.

`aggregated_train` is loaded from a CSV file, which is the training dataset used to train the XGBoost model. This dataset is used to determine the minimum and maximum values for scaling.

`data_preprocessor(payload: dict)` is defined as a function to preprocess and predict sales.

  - a. The payload, which contains data relevant for making predictions, is converted into a DataFrame (payload_df) with an index set to 0. This is because the model expects a DataFrame as input.
  - b. The minimum (X_min) and maximum (X_max) sales values are calculated from the aggregated_train dataset. This information is crucial for upscaling the forecasted sales.
  - c. The input data is transformed using the preprocessor, and predictions are made using the XGBoost model.
  - d. The predicted value, which is in a scaled form, is then converted back to the original scale using the X_min and X_max. This step ensures that the prediction is in a human-understandable format.
  - e. The result is rounded to 2 decimal places, which is often considered a good practice for presenting real-world values.

5. ### Displaying Results

![forecast sales screen](https://github.com/snyamson/P4-SalesSense-Interactive-Sales-Forecasting-Web-Application/assets/58486437/95d3327a-376d-409f-b9a1-4052cd791f12)

A simple click on the "Submit" button delivers a real-time sales forecast.

## Real-Time Sales Predictions

SalesSense takes the guesswork out of sales forecasting. With real-time predictions, businesses can optimize inventory, adjust marketing strategies, and make informed decisions on the fly. This is a powerful tool for businesses in highly competitive markets.

The background of the sales forecast card indicates whether the sales are positive or negative.

- Positive (Green):

![forecast sales screen](https://github.com/snyamson/P4-SalesSense-Interactive-Sales-Forecasting-Web-Application/assets/58486437/a3669eff-9a11-428e-a23a-7bb69d6f1df4)

- Negative (Red):

![neg sales screen](https://github.com/snyamson/P4-SalesSense-Interactive-Sales-Forecasting-Web-Application/assets/58486437/87aa5298-257a-41f4-b66e-23b663635896)

## Sales History

After making a sales prediction, the app internally generates a DataFrame based on the predicted sales and stores it within the session state. Subsequently, a new tab emerges in the sidebar, presenting this valuable historical data to users. This feature not only offers users easy access to past forecasts but also serves as a useful tool for learning from previous predictions and enhancing decision-making processes.

![history](https://github.com/snyamson/P4-SalesSense-Interactive-Sales-Forecasting-Web-Application/assets/58486437/3e9d0dcf-777a-4c84-9017-50f0809c3961)

## Viewing Sales Trends

SalesSense goes a step further by allowing users to view historical sales trends. 

![trend](https://github.com/snyamson/P4-SalesSense-Interactive-Sales-Forecasting-Web-Application/assets/58486437/58671502-412d-4067-a8d6-0d1c20e3bc99)

Through an intuitive line chart, users can explore how sales have evolved over time. The ability to switch between real-time predictions and sales trends provides a comprehensive view of sales data.

## Conclusion

SalesSense is more than just a sales forecasting tool; it's a solution that empowers businesses to thrive in the ever-changing marketplace. The development process involved data collection, model training, and the creation of an interactive user interface. SalesSense showcases the potential of machine learning and how it can be harnessed for real-time decision-making.



