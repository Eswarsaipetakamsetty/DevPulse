🔐 1. Auth Service (Spring Boot)
Handles user authentication & JWT token generation

POST   /auth/org/create       # Register a new org
POST   /auth/signup           # Register a new user either as an employee
POST   /auth/login            # Login and receive JWT
POST   /auth/make_manager/<int: id>   #make a employee as a manager
GET    /auth/user/<int: id>   # Get logged-in user info
POST   /auth/token/validate   # Optional token introspection
