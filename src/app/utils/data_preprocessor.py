import os
import joblib
import pandas as pd

# ---------------- PATH SETUP ----------------

# Base directory of this file: src/app/utils/
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Path to preprocessor: src/model/preprocessor.joblib
PREPROCESSOR_PATH = os.path.abspath(
    os.path.join(BASE_DIR, "..", "..", "model", "preprocessor.joblib")
)
preprocessor = joblib.load(PREPROCESSOR_PATH)

# Path to model: src/model/xgb_model.joblib
MODEL_PATH = os.path.abspath(
    os.path.join(BASE_DIR, "..", "..", "model", "xgb_model.joblib")
)
model = joblib.load(MODEL_PATH)

# Path to aggregated CSV: src/notebook/data/aggregated_data.csv
DATA_PATH = os.path.abspath(
    os.path.join(BASE_DIR, "..", "..", "notebook", "data", "aggregated_data.csv")
)

# ---------------- LOAD SCALING RANGE SAFELY ----------------

# Default fallback values (in case CSV is missing/empty)
X_MIN = 1000.0
X_MAX = 3000.0

try:
    if os.path.exists(DATA_PATH) and os.path.getsize(DATA_PATH) > 0:
        aggregated_train = pd.read_csv(DATA_PATH)
        if "sales" in aggregated_train.columns and not aggregated_train["sales"].empty:
            X_MIN = float(aggregated_train["sales"].min())
            X_MAX = float(aggregated_train["sales"].max())
        else:
            print("[WARNING] 'sales' column missing or empty in aggregated_data.csv. Using default X_MIN/X_MAX.")
    else:
        print(f"[WARNING] File missing or empty at: {DATA_PATH}. Using default X_MIN/X_MAX.")
except Exception as e:
    print(f"[WARNING] Could not read aggregated_data.csv: {e}")
    print("[WARNING] Using default X_MIN/X_MAX for scaling.")


# ---------------- MAIN FUNCTION ----------------

def data_preprocessor(payload: dict) -> float:
    """
    Takes user input (payload dict), applies preprocessing,
    predicts scaled value using the trained model,
    rescales it back to approximate original sales range, and returns it.
    """

    # Convert dictionary to a one-row DataFrame
    payload_df = pd.DataFrame(payload, index=[0])

    # Transform features with preprocessor
    transformed = preprocessor.transform(payload_df)

    # Model outputs a scaled prediction (usually between 0 and 1)
    scaled_prediction = model.predict(transformed)[0]

    # Rescale to original range using X_MIN and X_MAX
    original_prediction = scaled_prediction * (X_MAX - X_MIN) + X_MIN

    # Round for display
    return round(float(original_prediction), 2)
