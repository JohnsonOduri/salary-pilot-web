from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np



# Initialize Flask app
app = Flask(__name__)

from flask_cors import CORS
CORS(app)


# Load the saved model pipeline
pipeline = joblib.load("required files/model_pipeline.pkl")

# Load the label encoders
label_encoders = joblib.load("required files/label_encoders.pkl")

# 🔍 Check encoders on server start
print("🔍 Label Encoders Loaded:")
for col, le in label_encoders.items():
    print(f"{col}: {list(le.classes_)}")

# Required input fields
REQUIRED_FIELDS = ['Age', 'Gender', 'Education Level', 'Job Title', 'Years of Experience']

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Parse input JSON
        data = request.get_json()
        print("📥 Incoming data:", data)

        # Check for required fields
        if not all(field in data for field in REQUIRED_FIELDS):
            return jsonify({"error": "Missing one or more required fields"}), 400

        # Prepare input DataFrame
        input_df = pd.DataFrame([data])

        # Encode categorical features using label encoders
        for col in label_encoders:
            if col in input_df.columns:
                try:
                    input_df[col] = label_encoders[col].transform(input_df[col])
                except ValueError as e:
                    return jsonify({"error": f"Invalid value for {col}. Must be one of {list(label_encoders[col].classes_)}"}), 400
            else:
                return jsonify({"error": f"Missing required column: {col}"}), 400

        # Predict using the pipeline
        prediction = pipeline.predict(input_df)[0]

        return jsonify({
            "prediction": round(float(prediction), 2),
            "message": "Prediction successful"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the app
if __name__ == "__main__":
    app.run(debug=True)
