# Admin Account Setup Guide

## 🔐 Security Overview

**IMPORTANT:** Admin accounts CANNOT be created through the public signup page. This is intentional for security reasons.

### Why This Matters

- All public signups at `/signup` automatically create regular user accounts
- Admin privileges can only be granted through secure backend methods
- This prevents unauthorized users from gaining admin access

---

## 🚀 Creating Your First Admin Account

### Method 1: Database Seeding (Recommended for Development)

1. Create a seed script in your backend project:

```javascript
// backend/seeds/createAdmin.js
const bcrypt = require("bcrypt");
const { User } = require("../models"); // Adjust to your model path

async function createFirstAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({
      where: { email: "admin@bxcakes.com" },
    });

    if (existingAdmin) {
      console.log("Admin account already exists");
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("Admin1234!", 10);

    // Create admin user
    const admin = await User.create({
      name: "Super Admin",
      email: "admin@bxcakes.com",
      password: hashedPassword,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("✅ First admin account created successfully!");
    console.log("📧 Email: admin@bxcakes.com");
    console.log("🔑 Password: Admin1234!");
    console.log("⚠️  CHANGE THIS PASSWORD IMMEDIATELY AFTER FIRST LOGIN");
  } catch (error) {
    console.error("❌ Error creating admin:", error);
  }
}

createFirstAdmin();
```

2. Run the seed script:

```bash
node backend/seeds/createAdmin.js
```

3. **IMPORTANT:** Change the default password immediately after first login!

---

### Method 2: Direct Database Insert (Production)

1. First, hash your password using bcrypt:

```javascript
// In Node.js console or a separate script
const bcrypt = require("bcrypt");
const password = "YourSecurePassword123!";
bcrypt.hash(password, 10).then((hash) => console.log(hash));
```

2. Insert into database:

```sql
-- PostgreSQL example
INSERT INTO users (id, name, email, password, role, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'Super Admin',
  'admin@bxcakes.com',
  '$2b$10$YOUR_HASHED_PASSWORD_HERE',  -- Use the hash from step 1
  'admin',
  NOW(),
  NOW()
);
```

```sql
-- MySQL example
INSERT INTO users (id, name, email, password, role, created_at, updated_at)
VALUES (
  UUID(),
  'Super Admin',
  'admin@bxcakes.com',
  '$2b$10$YOUR_HASHED_PASSWORD_HERE',
  'admin',
  NOW(),
  NOW()
);
```

---

### Method 3: CLI Tool (Most Secure for Production)

Create a CLI command in your backend:

```javascript
// backend/cli/createAdmin.js
const readline = require("readline");
const bcrypt = require("bcrypt");
const { User } = require("../models");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function createAdmin() {
  console.log("🔐 Admin Account Creation Tool\n");

  const name = await question("Enter admin name: ");
  const email = await question("Enter admin email: ");
  const password = await question("Enter password (min 8 chars): ");
  const confirmPassword = await question("Confirm password: ");

  if (password !== confirmPassword) {
    console.error("❌ Passwords do not match!");
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("❌ Password must be at least 8 characters!");
    process.exit(1);
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("\n✅ Admin account created successfully!");
    console.log(`📧 Email: ${email}`);
    console.log("🚀 You can now login to the admin panel");
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    rl.close();
    process.exit(0);
  }
}

createAdmin();
```

Run it:

```bash
node backend/cli/createAdmin.js
```

---

## 👥 Creating Additional Admin Accounts

Once you have one admin account, you can create more through the admin panel:

### Option 1: Via Admin Panel UI (Coming Soon)

1. Login as an existing admin
2. Navigate to **Settings** → **User Management**
3. Click **"Create Admin Account"**
4. Fill in the form and submit

### Option 2: Via API

```bash
# Get admin JWT token first by logging in
curl -X POST https://bx-cakes-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@bxcakes.com",
    "password": "YourPassword123!"
  }'

# Use the token to create new admin
curl -X POST https://bx-cakes-backend.onrender.com/api/auth/admin/create \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Admin",
    "email": "newadmin@bxcakes.com",
    "password": "SecurePassword123!",
    "confirmPassword": "SecurePassword123!"
  }'
```

---

## 🔍 Verifying User Roles

### Check in Database

```sql
-- List all admin users
SELECT id, name, email, role, created_at
FROM users
WHERE role = 'admin';

-- Count users by role
SELECT role, COUNT(*) as count
FROM users
GROUP BY role;
```

### Check via API

When a user logs in, the response includes their role:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "name": "...",
      "email": "...",
      "role": "admin" // or "user"
    },
    "token": "..."
  }
}
```

---

## ⚠️ Security Best Practices

### DO ✅

- Always use bcrypt with at least 10 rounds for password hashing
- Store admin creation logs for audit trail
- Use strong passwords for admin accounts (min 12 chars, mixed case, numbers, symbols)
- Enable 2FA for admin accounts (future feature)
- Regularly review admin account list
- Immediately revoke access for departed team members
- Use environment variables for sensitive data

### DON'T ❌

- Never store passwords in plain text
- Never expose admin creation through public endpoints
- Never trust client-side role assignments
- Never commit admin credentials to git
- Never use the same password for multiple admin accounts
- Never share admin credentials

---

## 🐛 Troubleshooting

### "Access Denied" when trying to access admin panel

**Possible causes:**

1. Your account has `role = 'user'` instead of `role = 'admin'`
2. Your JWT token doesn't include the role
3. Frontend is not sending the authorization header

**Solution:**

```sql
-- Check your account role
SELECT email, role FROM users WHERE email = 'your@email.com';

-- Update role if needed (ONLY if you're authorized!)
UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
```

### "Email already exists" when creating admin

**Solution:** The email is already registered as a regular user. Either:

1. Use a different email for the admin account
2. Update the existing user's role to admin (if authorized):

```sql
UPDATE users SET role = 'admin' WHERE email = 'existing@email.com';
```

### Password validation fails

Ensure your password meets these requirements:

- Minimum 8 characters
- At least 1 uppercase letter (A-Z)
- At least 1 lowercase letter (a-z)
- At least 1 number (0-9)
- Special characters recommended but not required

---

## 📞 Support

If you encounter issues:

1. Check the backend logs for error messages
2. Verify database connection is working
3. Ensure bcrypt is properly installed: `npm install bcrypt`
4. Review the API documentation in `API_DOCUMENTATION.md`
5. Contact the backend development team

---

## 🔄 Quick Reference

| Action         | Method | Endpoint             | Auth Required          |
| -------------- | ------ | -------------------- | ---------------------- |
| Regular Signup | POST   | `/auth/signup`       | No (creates user role) |
| Login          | POST   | `/auth/login`        | No (returns role)      |
| Create Admin   | POST   | `/auth/admin/create` | Yes (admin only)       |
| Get Profile    | GET    | `/user/profile`      | Yes                    |

**Default Test Credentials (Change in Production!):**

```
Admin Account:
Email: admin@bxcakes.com
Password: Admin1234!

Regular User:
Email: test@bxcakes.com
Password: Test1234!
```

---

**Last Updated:** December 31, 2025  
**Version:** 1.0
