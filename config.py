import os
import json

# Ensure the 'dist' directory exists
os.makedirs("dist", exist_ok=True)

# List of environment variables to include in the JSON file
env_var_list = ["BRANCH", "COMMIT_REF"]  # Replace with your variable names

# Get the values of the environment variables
env_vars = {var: os.getenv(var, "") for var in env_var_list}

# Write the environment variables to a JSON file
with open("dist/env-config.json", "w") as json_file:
    json.dump(env_vars, json_file)

print("Environment variables JSON file created: dist/env-config.json")
