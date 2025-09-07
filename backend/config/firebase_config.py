import firebase_admin
from firebase_admin import credentials, firestore
import os

# Initialize Firebase Admin SDK
def initialize_firebase():
    if not firebase_admin._apps:
        # In production, use service account key file
        # For development, you can use the default credentials
        try:
            # Try to use service account key if available
            service_account_path = os.getenv("FIREBASE_SERVICE_ACCOUNT_PATH")
            if service_account_path and os.path.exists(service_account_path):
                cred = credentials.Certificate(service_account_path)
                firebase_admin.initialize_app(cred)
            else:
                # Use default credentials (for development)
                firebase_admin.initialize_app()
        except Exception as e:
            print(f"Firebase initialization error: {e}")
            # For demo purposes, we'll continue without Firebase
            return None
    
    return firestore.client()

# Get Firestore client
def get_firestore_client():
    return initialize_firebase()
