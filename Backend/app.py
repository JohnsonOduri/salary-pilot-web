from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os
import fitz  # PyMuPDF

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load the saved model pipeline
pipeline = joblib.load("required files/model_pipeline.pkl")

# Load the label encoders
label_encoders = joblib.load("required files/label_encoders.pkl")

print("Label Encoders Loaded")

# Required input fields for salary prediction
REQUIRED_FIELDS = ['Age', 'Gender', 'Education Level', 'Job Title', 'Years of Experience']


# ----------------- SALARY PREDICTION ----------------------
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        print(" Incoming data:", data)

        if not all(field in data for field in REQUIRED_FIELDS):
            return jsonify({"error": "Missing one or more required fields"}), 400

        input_df = pd.DataFrame([data])

        # Apply label encoding
        for col in label_encoders:
            if col in input_df.columns:
                try:
                    input_df[col] = label_encoders[col].transform(input_df[col])
                except ValueError as e:
                    return jsonify({
                        "error": f"Invalid value for {col}. Must be one of {list(label_encoders[col].classes_)}"
                    }), 400
            else:
                return jsonify({"error": f"Missing required column: {col}"}), 400

        # Predict
        prediction = pipeline.predict(input_df)[0]

        return jsonify({
            "prediction": round(float(prediction), 2),
            "message": "Prediction successful"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ----------------- RESUME TEXT EXTRACTION ----------------------
@app.route("/extract", methods=["POST"])
def extract_text():
    if 'resume' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['resume']
    if not file.filename.endswith(".pdf"):
        return jsonify({"error": "Only PDF files are supported"}), 400

    filepath = os.path.join("/tmp", file.filename)
    file.save(filepath)

    try:
        text = ""
        with fitz.open(filepath) as doc:
            for page in doc:
                text += page.get_text()
        os.remove(filepath)
        return jsonify({"text": text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ----------------- RUN SERVER ----------------------
if __name__ == "__main__":
    app.run(debug=True)
