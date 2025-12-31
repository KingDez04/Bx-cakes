# BX-Cakes Backend API Documentation

## Table of Contents

1. [Authentication APIs](#authentication-apis)
2. [User Profile APIs](#user-profile-apis)
3. [Custom Cake APIs](#custom-cake-apis)
4. [Modify Cake APIs](#modify-cake-apis)
5. [Ready-Made Cake APIs](#ready-made-cake-apis)
6. [Order Management APIs](#order-management-apis)
7. [Admin Cake Gallery APIs](#admin-cake-gallery-apis)
8. [Admin Ready-Made Cakes APIs](#admin-ready-made-cakes-apis)
9. [Admin Customer Uploads APIs](#admin-customer-uploads-apis)
10. [Admin Order History APIs](#admin-order-history-apis)
11. [Review APIs](#review-apis)
12. [File Upload APIs](#file-upload-apis)
13. [Contact Form API](#contact-form-api)
14. [Data Models](#data-models)

---

## Base URL

```
Development: http://localhost:5000/api
Production: https://api.bxcakes.com/api
```

## Authentication

All authenticated routes require:

```
Headers: {
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
}
```

---

## 1. Authentication APIs

### 1.1 User Registration

**Endpoint:** `POST /auth/signup`

**Request Body:**

```json
{
  "name": "string (required, min: 2, max: 100)",
  "email": "string (required, valid email)",
  "password": "string (required, min: 8, must contain uppercase, lowercase, number)",
  "confirmPassword": "string (required, must match password)"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "user": {
      "id": "string (UUID)",
      "name": "string",
      "email": "string",
      "profileImage": "string (URL, nullable)",
      "role": "string (always 'user' for public signups)",
      "createdAt": "string (ISO 8601)"
    },
    "token": "string (JWT)"
  }
}
```

**Error Responses:**

- 400: Email already exists
- 422: Validation error

**Security Notes:**

- **All public signups are automatically assigned the 'user' role**
- **Admin accounts CANNOT be created via this endpoint**
- **Attempting to pass a 'role' field in the request body should be ignored by the backend**
- **Admin accounts must be created manually by existing admins or through database seeding**

---

### 1.2 User Login

**Endpoint:** `POST /auth/login`

**Request Body:**

```json
{
  "email": "string (required, valid email)",
  "password": "string (required)"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "string (UUID)",
      "name": "string",
      "email": "string",
      "profileImage": "string (URL, nullable)",
      "role": "string (enum: 'user', 'admin')",
      "totalOrders": "number",
      "totalSpent": "number"
    },
    "token": "string (JWT)"
  }
}
```

**Error Responses:**

- 401: Invalid credentials
- 404: User not found

---

### 1.3 Password Reset Request

**Endpoint:** `POST /auth/password-reset`

**Request Body:**

```json
{
  "email": "string (required, valid email)"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Password reset link sent to your email"
}
```

**Error Responses:**

- 404: Email not found

---

### 1.4 Password Reset Confirm

**Endpoint:** `POST /auth/password-reset/confirm`

**Request Body:**

```json
{
  "token": "string (required, reset token from email)",
  "newPassword": "string (required, min: 8)",
  "confirmPassword": "string (required, must match newPassword)"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

**Error Responses:**

- 400: Invalid or expired token
- 422: Validation error

---

### 1.5 Create Admin Account (Admin Only)

**Endpoint:** `POST /auth/admin/create`
**Auth Required:** Yes (Admin only)

**Request Body:**

```json
{
  "name": "string (required, min: 2, max: 100)",
  "email": "string (required, valid email)",
  "password": "string (required, min: 8, must contain uppercase, lowercase, number)",
  "confirmPassword": "string (required, must match password)"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Admin account created successfully",
  "data": {
    "user": {
      "id": "string (UUID)",
      "name": "string",
      "email": "string",
      "role": "admin",
      "createdAt": "string (ISO 8601)"
    }
  }
}
```

**Error Responses:**

- 401: Not authenticated
- 403: Forbidden (requesting user is not an admin)
- 400: Email already exists
- 422: Validation error

**Security Notes:**

- **This endpoint can ONLY be accessed by existing admin users**
- **Requires valid admin JWT token in Authorization header**
- **Backend must verify the requesting user has 'admin' role before creating new admin**
- **For the first admin account, use database seeding or direct database insert**

**Initial Admin Setup (Backend Implementation):**

```sql
-- SQL example for creating first admin account
INSERT INTO users (id, name, email, password, role, created_at)
VALUES (
  'UUID-HERE',
  'Super Admin',
  'admin@bxcakes.com',
  'HASHED_PASSWORD_HERE',
  'admin',
  NOW()
);
```

Or use a seed script:

```javascript
// Backend seed script example
const bcrypt = require("bcrypt");
const hashedPassword = await bcrypt.hash("Admin1234!", 10);

await User.create({
  name: "Super Admin",
  email: "admin@bxcakes.com",
  password: hashedPassword,
  role: "admin",
});
```

---

## 2. User Profile APIs

### 2.1 Get User Profile

**Endpoint:** `GET /user/profile`
**Auth Required:** Yes

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "string (UUID)",
    "name": "string",
    "email": "string",
    "profileImage": "string (URL, nullable)",
    "address": "string (nullable)",
    "phoneNumber": "string (nullable)",
    "personalNote": "string (nullable)",
    "totalOrders": "number",
    "totalSpent": "number (in Naira)",
    "createdAt": "string (ISO 8601)",
    "updatedAt": "string (ISO 8601)"
  }
}
```

---

### 2.2 Update User Profile

**Endpoint:** `PUT /user/profile`
**Auth Required:** Yes

**Request Body:**

```json
{
  "name": "string (optional)",
  "address": "string (optional)",
  "phoneNumber": "string (optional)",
  "personalNote": "string (optional)"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "string (UUID)",
    "name": "string",
    "email": "string",
    "profileImage": "string (URL, nullable)",
    "address": "string (nullable)",
    "phoneNumber": "string (nullable)",
    "personalNote": "string (nullable)"
  }
}
```

---

### 2.3 Update Email

**Endpoint:** `PUT /user/settings/email`
**Auth Required:** Yes

**Request Body:**

```json
{
  "email": "string (required, valid email)"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Email updated successfully",
  "data": {
    "email": "string"
  }
}
```

**Error Responses:**

- 400: Email already in use

---

### 2.4 Change Password

**Endpoint:** `PUT /user/settings/password`
**Auth Required:** Yes

**Request Body:**

```json
{
  "currentPassword": "string (required)",
  "newPassword": "string (required, min: 8)",
  "confirmPassword": "string (required, must match newPassword)"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Error Responses:**

- 401: Current password incorrect

---

### 2.5 Upload Profile Picture

**Endpoint:** `POST /user/profile/picture`
**Auth Required:** Yes
**Content-Type:** multipart/form-data

**Request Body:**

```
file: image file (required, max: 5MB, formats: jpg, jpeg, png)
```

**Response (200):**

```json
{
  "success": true,
  "message": "Profile picture uploaded successfully",
  "data": {
    "profileImage": "string (URL)"
  }
}
```

**Error Responses:**

- 400: Invalid file format or size

---

## 3. Custom Cake APIs

### 3.1 Create Custom Cake Order

**Endpoint:** `POST /orders/custom-cake`
**Auth Required:** Yes

**Request Body:**

```json
{
  "shape": "string (required, enum: 'Circle', 'Rectangle', 'Square', 'Heart')",
  "numberOfTiers": "number (required, min: 1, max: 10)",
  "covering": "string (required, enum: 'Buttercream', 'Fondant', 'Naked', 'Ganache')",
  "tiers": [
    {
      "tierNumber": "number (required)",
      "size": "string (required, format: 'Ø:8\" H:10\"' or 'L:8\" W:9\" H:10\"')",
      "numberOfFlavors": "number (required, min: 1, max: 5)",
      "flavors": [
        {
          "name": "string (required)",
          "percentage": "number (required, 0-100)"
        }
      ]
    }
  ],
  "customerNote": "string (optional, max: 1000)",
  "deliveryMethod": "string (required, enum: 'pickup', 'delivery')",
  "deliveryAddress": "string (required if deliveryMethod is 'delivery')",
  "deliveryDate": "string (required, ISO 8601 date)",
  "totalPrice": "number (required, in Naira)"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Custom cake order placed successfully",
  "data": {
    "orderId": "string (UUID)",
    "orderNumber": "string (e.g., 'ORD-12845')",
    "status": "string (enum: 'pending', 'confirmed', 'in-progress', 'completed', 'cancelled')",
    "totalPrice": "number",
    "createdAt": "string (ISO 8601)"
  }
}
```

---

### 3.2 Get Custom Cake Pricing

**Endpoint:** `POST /cakes/custom/calculate-price`
**Auth Required:** No

**Request Body:**

```json
{
  "shape": "string (required)",
  "numberOfTiers": "number (required)",
  "covering": "string (required)",
  "tiers": [
    {
      "size": "string (required)",
      "numberOfFlavors": "number (required)"
    }
  ]
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "basePrice": "number",
    "tierPrices": [
      {
        "tierNumber": "number",
        "price": "number"
      }
    ],
    "coveringPrice": "number",
    "totalPrice": "number"
  }
}
```

---

## 4. Modify Cake APIs

### 4.1 Get Available Cakes for Modification

**Endpoint:** `GET /cakes/modify`
**Auth Required:** No

**Query Parameters:**

- `category` (optional): string (Birthday, Wedding, Anniversary, etc.)
- `priceRange` (optional): string (0-20000, 20000-50000, 50000+)
- `page` (optional): number (default: 1)
- `limit` (optional): number (default: 20)

**Response (200):**

```json
{
  "success": true,
  "data": {
    "cakes": [
      {
        "id": "string (UUID)",
        "name": "string",
        "image": "string (URL)",
        "basePrice": "number",
        "category": "string",
        "description": "string",
        "shape": "string",
        "tiers": "number",
        "covering": "string",
        "available": "boolean"
      }
    ],
    "pagination": {
      "currentPage": "number",
      "totalPages": "number",
      "totalItems": "number",
      "itemsPerPage": "number"
    }
  }
}
```

---

### 4.2 Get Modify Cake Details

**Endpoint:** `GET /cakes/modify/:id`
**Auth Required:** No

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "string (UUID)",
    "name": "string",
    "image": "string (URL)",
    "basePrice": "number",
    "category": "string",
    "description": "string",
    "shape": "string",
    "numberOfTiers": "number",
    "covering": "string",
    "tiers": [
      {
        "tierNumber": "number",
        "size": "string",
        "flavors": ["string"]
      }
    ],
    "modifications": {
      "canChangeShape": "boolean",
      "canChangeTiers": "boolean",
      "canChangeCovering": "boolean",
      "canChangeFlavors": "boolean"
    }
  }
}
```

---

### 4.3 Create Modified Cake Order

**Endpoint:** `POST /orders/modify-cake`
**Auth Required:** Yes

**Request Body:**

```json
{
  "originalCakeId": "string (required, UUID)",
  "modifications": {
    "shape": "string (optional)",
    "numberOfTiers": "number (optional)",
    "covering": "string (optional)",
    "tiers": [
      {
        "tierNumber": "number (required)",
        "size": "string (optional)",
        "flavors": [
          {
            "name": "string (required)",
            "percentage": "number (required)"
          }
        ]
      }
    ]
  },
  "customerNote": "string (optional, max: 1000)",
  "deliveryMethod": "string (required, enum: 'pickup', 'delivery')",
  "deliveryAddress": "string (required if deliveryMethod is 'delivery')",
  "deliveryDate": "string (required, ISO 8601 date)",
  "totalPrice": "number (required, in Naira)"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Modified cake order placed successfully",
  "data": {
    "orderId": "string (UUID)",
    "orderNumber": "string",
    "status": "string",
    "totalPrice": "number",
    "createdAt": "string (ISO 8601)"
  }
}
```

---

## 5. Ready-Made Cake APIs

### 5.1 Get All Ready-Made Cakes

**Endpoint:** `GET /cakes/ready-made`
**Auth Required:** No

**Query Parameters:**

- `category` (optional): string (All, Chocolate Cakes, Vanilla Cakes, etc.)
- `priceRange` (optional): string (all, under50, 50to100, over100)
- `search` (optional): string (search by name or description)
- `page` (optional): number (default: 1)
- `limit` (optional): number (default: 12)

**Response (200):**

```json
{
  "success": true,
  "data": {
    "cakes": [
      {
        "id": "string (UUID)",
        "name": "string",
        "price": "number (in USD)",
        "priceNGN": "number (in Naira)",
        "image": "string (URL)",
        "rating": "number (0-5, decimal)",
        "reviewCount": "number",
        "category": "string",
        "description": "string",
        "inStock": "boolean",
        "stockQuantity": "number"
      }
    ],
    "pagination": {
      "currentPage": "number",
      "totalPages": "number",
      "totalItems": "number",
      "itemsPerPage": "number"
    }
  }
}
```

---

### 5.2 Get Ready-Made Cake Details

**Endpoint:** `GET /cakes/ready-made/:id`
**Auth Required:** No

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "string (UUID)",
    "name": "string",
    "price": "number (in USD)",
    "priceNGN": "number (in Naira)",
    "image": "string (URL)",
    "images": ["string (URLs)"],
    "rating": "number (0-5, decimal)",
    "reviewCount": "number",
    "category": "string",
    "description": "string",
    "fullDescription": "string",
    "ingredients": ["string"],
    "allergens": ["string"],
    "servings": "number",
    "weight": "string",
    "dimensions": "string",
    "inStock": "boolean",
    "stockQuantity": "number",
    "specifications": {
      "shape": "string",
      "tiers": "number",
      "covering": "string",
      "flavors": ["string"]
    }
  }
}
```

---

### 5.3 Create Ready-Made Cake Order

**Endpoint:** `POST /orders/ready-made`
**Auth Required:** Yes

**Request Body:**

```json
{
  "cakeId": "string (required, UUID)",
  "quantity": "number (required, min: 1)",
  "customerNote": "string (optional, max: 1000)",
  "deliveryMethod": "string (required, enum: 'pickup', 'delivery')",
  "deliveryAddress": "string (required if deliveryMethod is 'delivery')",
  "deliveryDate": "string (required, ISO 8601 date)",
  "totalPrice": "number (required, in Naira)"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "orderId": "string (UUID)",
    "orderNumber": "string",
    "status": "string",
    "totalPrice": "number",
    "createdAt": "string (ISO 8601)"
  }
}
```

---

## 6. Order Management APIs

### 6.1 Get User Orders

**Endpoint:** `GET /user/orders`
**Auth Required:** Yes

**Query Parameters:**

- `status` (optional): string (all, pending, ongoing, completed, cancelled)
- `category` (optional): string (all, custom, modify, ready-made)
- `priceRange` (optional): string (all, 0-20000, 20000-50000, 50000+)
- `page` (optional): number (default: 1)
- `limit` (optional): number (default: 10)

**Response (200):**

```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "string (UUID)",
        "orderNumber": "string",
        "orderType": "string (enum: 'custom', 'modify', 'ready-made')",
        "status": "string",
        "orderDate": "string (ISO 8601)",
        "deliveryDate": "string (ISO 8601)",
        "totalPrice": "number",
        "location": "string",
        "hasReview": "boolean",
        "image": "string (URL, cake image)",
        "cakeDetails": {
          "name": "string (nullable for custom)",
          "shape": "string",
          "tiers": "string or number",
          "covering": "string"
        }
      }
    ],
    "pagination": {
      "currentPage": "number",
      "totalPages": "number",
      "totalItems": "number"
    }
  }
}
```

---

### 6.2 Get Order Details

**Endpoint:** `GET /orders/:id`
**Auth Required:** Yes

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "string (UUID)",
    "orderNumber": "string",
    "orderType": "string",
    "status": "string",
    "orderDate": "string (ISO 8601)",
    "deliveryDate": "string (ISO 8601)",
    "deliveryMethod": "string",
    "deliveryAddress": "string (nullable)",
    "totalPrice": "number",
    "image": "string (URL)",
    "cakeDetails": {
      "shape": "string",
      "numberOfTiers": "number",
      "covering": "string",
      "tiers": [
        {
          "tierNumber": "number",
          "flavors": "number",
          "measurement": "string",
          "flavourSpec": "string"
        }
      ]
    },
    "customerNote": "string (nullable)",
    "timeline": [
      {
        "status": "string",
        "timestamp": "string (ISO 8601)",
        "note": "string (optional)"
      }
    ]
  }
}
```

---

### 6.3 Reorder Previous Order

**Endpoint:** `POST /orders/:id/reorder`
**Auth Required:** Yes

**Request Body:**

```json
{
  "modifications": {
    "deliveryDate": "string (optional, ISO 8601)",
    "deliveryMethod": "string (optional)",
    "customerNote": "string (optional)"
  }
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Order reordered successfully",
  "data": {
    "orderId": "string (UUID)",
    "orderNumber": "string",
    "totalPrice": "number"
  }
}
```

---

### 6.4 Edit and Reorder

**Endpoint:** `POST /orders/:id/edit-reorder`
**Auth Required:** Yes

**Request Body:**

```json
{
  "shape": "string (optional)",
  "numberOfTiers": "string (optional)",
  "covering": "string (optional)",
  "tiers": [
    {
      "tierNumber": "number",
      "size": "string (optional)",
      "flavor": "string (optional)"
    }
  ],
  "customerNote": "string (optional)",
  "deliveryDate": "string (optional, ISO 8601)"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Modified order placed successfully",
  "data": {
    "orderId": "string (UUID)",
    "orderNumber": "string",
    "totalPrice": "number"
  }
}
```

---

## 7. Admin Cake Gallery APIs

### 7.1 Get All Gallery Cakes (Admin)

**Endpoint:** `GET /admin/cake-gallery`
**Auth Required:** Yes (Admin only)

**Query Parameters:**

- `event` (optional): string (All, Birthday, Wedding, Anniversary)
- `gender` (optional): string (All, Male, Female, Unisex)
- `price` (optional): string (All, 0-20000, 20000-50000, 50000+)
- `time` (optional): string (All, Recent, Old)
- `covering` (optional): string (All, Buttercream, Fondant, Naked)
- `age` (optional): string (All, Kids, Teens, Adults)
- `page` (optional): number (default: 1)
- `limit` (optional): number (default: 20)

**Response (200):**

```json
{
  "success": true,
  "data": {
    "cakes": [
      {
        "id": "string (UUID)",
        "image": "string (URL)",
        "shape": "string",
        "size": "string",
        "tiers": "string",
        "price": "number",
        "stock": "number",
        "tier1Flavor": "string",
        "tier1Measurement": "string",
        "tier1FlavorSpec": "string",
        "tier2Flavor": "string (nullable)",
        "tier2Measurement": "string (nullable)",
        "tier2FlavorSpec": "string (nullable)",
        "covering": "string",
        "category": "string",
        "condition": "string",
        "event": "string",
        "gender": "string",
        "ageGroup": "string",
        "createdAt": "string (ISO 8601)",
        "updatedAt": "string (ISO 8601)"
      }
    ],
    "pagination": {
      "currentPage": "number",
      "totalPages": "number",
      "totalItems": "number"
    }
  }
}
```

---

### 7.2 Add Cake to Gallery (Admin)

**Endpoint:** `POST /admin/cake-gallery`
**Auth Required:** Yes (Admin only)
**Content-Type:** multipart/form-data

**Request Body:**

```
image: file (required)
name: string (required)
price: number (required)
stock: number (required)
shape: string (required)
numberOfTiers: number (required)
covering: string (required)
tier1Size: string (required)
tier1Flavors: string (required, comma-separated)
tier2Size: string (optional)
tier2Flavors: string (optional)
tier3Size: string (optional)
tier3Flavors: string (optional)
category: string (required)
event: string (required)
gender: string (required)
ageGroup: string (required)
```

**Response (201):**

```json
{
  "success": true,
  "message": "Cake added to gallery successfully",
  "data": {
    "id": "string (UUID)",
    "image": "string (URL)",
    "name": "string",
    "price": "number"
  }
}
```

---

### 7.3 Update Gallery Cake (Admin)

**Endpoint:** `PUT /admin/cake-gallery/:id`
**Auth Required:** Yes (Admin only)

**Request Body:** (all fields optional)

```json
{
  "name": "string",
  "price": "number",
  "stock": "number",
  "shape": "string",
  "covering": "string",
  "category": "string",
  "event": "string",
  "gender": "string",
  "ageGroup": "string"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Cake updated successfully",
  "data": {
    "id": "string (UUID)",
    "updatedFields": ["string"]
  }
}
```

---

### 7.4 Delete Gallery Cake (Admin)

**Endpoint:** `DELETE /admin/cake-gallery/:id`
**Auth Required:** Yes (Admin only)

**Response (200):**

```json
{
  "success": true,
  "message": "Cake moved to deleted gallery (recoverable for 30 days)"
}
```

---

### 7.5 Get Deleted Cakes (Admin)

**Endpoint:** `GET /admin/cake-gallery/deleted`
**Auth Required:** Yes (Admin only)

**Query Parameters:**

- `category` (optional): string

**Response (200):**

```json
{
  "success": true,
  "data": {
    "cakes": [
      {
        "id": "string (UUID)",
        "image": "string (URL)",
        "shape": "string",
        "size": "string",
        "tiers": "string",
        "price": "number",
        "covering": "string",
        "category": "string",
        "deletedAt": "string (ISO 8601)",
        "expiresAt": "string (ISO 8601, 30 days from deletion)"
      }
    ]
  }
}
```

---

### 7.6 Recover Deleted Cake (Admin)

**Endpoint:** `POST /admin/cake-gallery/deleted/:id/recover`
**Auth Required:** Yes (Admin only)

**Response (200):**

```json
{
  "success": true,
  "message": "Cake recovered and added back to gallery"
}
```

---

### 7.7 Permanently Delete Cake (Admin)

**Endpoint:** `DELETE /admin/cake-gallery/deleted/:id/permanent`
**Auth Required:** Yes (Admin only)

**Response (200):**

```json
{
  "success": true,
  "message": "Cake permanently deleted"
}
```

---

## 8. Admin Ready-Made Cakes APIs

### 8.1 Get All Ready-Made Cakes (Admin)

**Endpoint:** `GET /admin/ready-made-cakes`
**Auth Required:** Yes (Admin only)

**Query Parameters:**

- `event` (optional): string
- `gender` (optional): string
- `price` (optional): string
- `time` (optional): string
- `covering` (optional): string
- `age` (optional): string

**Response (200):**

```json
{
  "success": true,
  "data": {
    "cakes": [
      {
        "id": "string (UUID)",
        "image": "string (URL)",
        "shape": "string",
        "size": "string",
        "tiers": "string",
        "price": "number",
        "stock": "number",
        "sold": "number",
        "tier1Flavor": "string",
        "tier1Measurement": "string",
        "tier1FlavorSpec": "string",
        "tier2Flavor": "string (nullable)",
        "tier2Measurement": "string (nullable)",
        "tier2FlavorSpec": "string (nullable)",
        "covering": "string",
        "category": "string",
        "event": "string",
        "gender": "string",
        "ageGroup": "string"
      }
    ]
  }
}
```

---

### 8.2 Add Ready-Made Cake (Admin)

**Endpoint:** `POST /admin/ready-made-cakes`
**Auth Required:** Yes (Admin only)
**Content-Type:** multipart/form-data

**Request Body:**

```
image: file (required)
name: string (required)
price: number (required)
quantity: number (required)
shape: string (required)
numberOfTiers: number (required)
covering: string (required)
tier1Size: string (required)
tier1Flavors: string (required)
tier2Size: string (optional)
tier2Flavors: string (optional)
event: string (required)
gender: string (required)
ageGroup: string (required)
```

**Response (201):**

```json
{
  "success": true,
  "message": "Ready-made cake added successfully",
  "data": {
    "id": "string (UUID)",
    "name": "string"
  }
}
```

---

### 8.3 Mark As Sold (Admin)

**Endpoint:** `PUT /admin/ready-made-cakes/:id/mark-sold`
**Auth Required:** Yes (Admin only)

**Request Body:**

```json
{
  "quantitySold": "number (required, min: 1)"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Cake marked as sold",
  "data": {
    "remainingStock": "number"
  }
}
```

---

### 8.4 Delete Ready-Made Cake (Admin)

**Endpoint:** `DELETE /admin/ready-made-cakes/:id`
**Auth Required:** Yes (Admin only)

**Response (200):**

```json
{
  "success": true,
  "message": "Cake moved to deleted (recoverable for 30 days)"
}
```

---

### 8.5 Get Deleted Ready-Made Cakes (Admin)

**Endpoint:** `GET /admin/ready-made-cakes/deleted`
**Auth Required:** Yes (Admin only)

**Response (200):**

```json
{
  "success": true,
  "data": {
    "cakes": [
      {
        "id": "string (UUID)",
        "image": "string (URL)",
        "shape": "string",
        "size": "string",
        "tiers": "string",
        "price": "number",
        "stock": "number",
        "covering": "string",
        "category": "string",
        "deletedAt": "string (ISO 8601)",
        "expiresAt": "string (ISO 8601)"
      }
    ]
  }
}
```

---

## 9. Admin Customer Uploads APIs

### 9.1 Get All Customer Uploads (Admin)

**Endpoint:** `GET /admin/customer-uploads`
**Auth Required:** Yes (Admin only)

**Query Parameters:**

- `category` (optional): string (All, Birthday, Wedding, Anniversary)
- `priceRange` (optional): string (All, 0-20000, 20000-50000, 50000+)
- `status` (optional): string (All, pending, approved, declined)

**Response (200):**

```json
{
  "success": true,
  "data": {
    "uploads": [
      {
        "id": "string (UUID)",
        "userId": "string (UUID)",
        "image": "string (URL)",
        "shape": "string",
        "size": "string",
        "tiers": "string",
        "tier1Flavor": "string",
        "tier1Measurement": "string",
        "tier1FlavorSpec": "string",
        "tier2Flavor": "string (nullable)",
        "tier2Measurement": "string (nullable)",
        "tier2FlavorSpec": "string (nullable)",
        "covering": "string",
        "category": "string",
        "condition": "string",
        "status": "string (enum: 'pending', 'approved', 'declined')",
        "pendingReviews": "number",
        "uploadedAt": "string (ISO 8601)"
      }
    ]
  }
}
```

---

### 9.2 Get Customer Upload Reviews (Admin)

**Endpoint:** `GET /admin/customer-uploads/reviews`
**Auth Required:** Yes (Admin only)

**Response (200):**

```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "string (UUID)",
        "orderNumber": "string",
        "customerId": "string (UUID)",
        "customerName": "string",
        "location": "string",
        "orderDate": "string (ISO 8601)",
        "image": "string (URL, nullable)",
        "tags": ["string"],
        "cakeDetails": {
          "shape": "string",
          "tiers": "number",
          "covering": "string"
        }
      }
    ],
    "totalPendingReviews": "number"
  }
}
```

---

### 9.3 Approve Customer Upload (Admin)

**Endpoint:** `POST /admin/customer-uploads/:id/approve`
**Auth Required:** Yes (Admin only)

**Request Body:**

```json
{
  "price": "number (optional, set price if adding to catalog)",
  "addToCatalog": "boolean (optional, default: false)"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Customer upload approved",
  "data": {
    "uploadId": "string (UUID)",
    "addedToCatalog": "boolean"
  }
}
```

---

### 9.4 Decline Customer Upload (Admin)

**Endpoint:** `POST /admin/customer-uploads/:id/decline`
**Auth Required:** Yes (Admin only)

**Request Body:**

```json
{
  "reason": "string (optional, reason for decline)"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Customer upload declined"
}
```

---

### 9.5 Delete Customer Upload (Admin)

**Endpoint:** `DELETE /admin/customer-uploads/:id`
**Auth Required:** Yes (Admin only)

**Response (200):**

```json
{
  "success": true,
  "message": "Upload moved to deleted (recoverable for 30 days)"
}
```

---

### 9.6 Get Deleted Customer Uploads (Admin)

**Endpoint:** `GET /admin/customer-uploads/deleted`
**Auth Required:** Yes (Admin only)

**Response (200):**

```json
{
  "success": true,
  "data": {
    "uploads": [
      {
        "id": "string (UUID)",
        "image": "string (URL)",
        "shape": "string",
        "size": "string",
        "tiers": "string",
        "covering": "string",
        "category": "string",
        "deletedAt": "string (ISO 8601)",
        "expiresAt": "string (ISO 8601)"
      }
    ]
  }
}
```

---

## 10. Admin Order History APIs

### 10.1 Get All Orders (Admin)

**Endpoint:** `GET /admin/orders`
**Auth Required:** Yes (Admin only)

**Query Parameters:**

- `status` (optional): string (All, Pending, Ongoing, Completed, Cancelled)
- `category` (optional): string (All, Custom, Modify, Ready-Made)
- `priceRange` (optional): string (All, 0-20000, 20000-50000, 50000+)
- `dateFrom` (optional): string (ISO 8601)
- `dateTo` (optional): string (ISO 8601)
- `page` (optional): number
- `limit` (optional): number

**Response (200):**

```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "string (UUID)",
        "orderNumber": "string",
        "orderDate": "string (ISO 8601)",
        "deliveryDate": "string (ISO 8601)",
        "status": "string",
        "details": "string (brief description)",
        "categories": ["string"],
        "customerId": "string (UUID)",
        "customerName": "string",
        "contact": "string (phone)",
        "email": "string",
        "totalPrice": "number"
      }
    ],
    "pagination": {
      "currentPage": "number",
      "totalPages": "number",
      "totalItems": "number"
    },
    "stats": {
      "totalOrders": "number",
      "pendingOrders": "number",
      "completedOrders": "number",
      "totalRevenue": "number"
    }
  }
}
```

---

### 10.2 Get Order Details (Admin)

**Endpoint:** `GET /admin/orders/:id`
**Auth Required:** Yes (Admin only)

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "string (UUID)",
    "orderNumber": "string",
    "orderType": "string",
    "status": "string",
    "orderDate": "string (ISO 8601)",
    "deliveryDate": "string (ISO 8601)",
    "deliveryMethod": "string",
    "deliveryAddress": "string (nullable)",
    "totalPrice": "number",
    "customer": {
      "id": "string (UUID)",
      "name": "string",
      "email": "string",
      "phone": "string",
      "address": "string"
    },
    "cakeDetails": {
      "image": "string (URL, nullable)",
      "shape": "string",
      "numberOfTiers": "number",
      "covering": "string",
      "tiers": [
        {
          "tierNumber": "number",
          "flavors": "number",
          "measurement": "string",
          "flavourSpec": "string"
        }
      ]
    },
    "customerNote": "string (nullable)",
    "timeline": [
      {
        "status": "string",
        "timestamp": "string (ISO 8601)",
        "updatedBy": "string (admin name or system)",
        "note": "string (optional)"
      }
    ]
  }
}
```

---

### 10.3 Update Order Status (Admin)

**Endpoint:** `PUT /admin/orders/:id/status`
**Auth Required:** Yes (Admin only)

**Request Body:**

```json
{
  "status": "string (required, enum: 'pending', 'confirmed', 'in-progress', 'completed', 'cancelled')",
  "note": "string (optional, admin note)"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Order status updated successfully",
  "data": {
    "orderId": "string (UUID)",
    "newStatus": "string",
    "updatedAt": "string (ISO 8601)"
  }
}
```

---

### 10.4 Get Dashboard Stats (Admin)

**Endpoint:** `GET /admin/dashboard/stats`
**Auth Required:** Yes (Admin only)

**Query Parameters:**

- `period` (optional): string (today, week, month, year, all)

**Response (200):**

```json
{
  "success": true,
  "data": {
    "totalCakes": "number",
    "totalOrders": "number",
    "totalRevenue": "number",
    "totalCustomers": "number",
    "recentOrders": [
      {
        "id": "string (UUID)",
        "orderNumber": "string",
        "customerName": "string",
        "totalPrice": "number",
        "status": "string",
        "orderDate": "string (ISO 8601)"
      }
    ],
    "ordersByStatus": {
      "pending": "number",
      "confirmed": "number",
      "inProgress": "number",
      "completed": "number",
      "cancelled": "number"
    },
    "revenueByMonth": [
      {
        "month": "string (YYYY-MM)",
        "revenue": "number"
      }
    ]
  }
}
```

---

## 11. Review APIs

### 11.1 Add Review

**Endpoint:** `POST /reviews`
**Auth Required:** Yes

**Request Body:**

```json
{
  "orderId": "string (required, UUID)",
  "rating": "number (required, 1-5)",
  "comment": "string (required, max: 1000)",
  "images": ["string (URLs, optional, max: 5)"]
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Review added successfully",
  "data": {
    "reviewId": "string (UUID)",
    "rating": "number",
    "createdAt": "string (ISO 8601)"
  }
}
```

---

### 11.2 Get Order Review

**Endpoint:** `GET /reviews/order/:orderId`
**Auth Required:** Yes

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "string (UUID)",
    "orderId": "string (UUID)",
    "userId": "string (UUID)",
    "userName": "string",
    "rating": "number",
    "comment": "string",
    "images": ["string (URLs)"],
    "createdAt": "string (ISO 8601)",
    "updatedAt": "string (ISO 8601)"
  }
}
```

---

### 11.3 Update Review

**Endpoint:** `PUT /reviews/:id`
**Auth Required:** Yes

**Request Body:**

```json
{
  "rating": "number (optional, 1-5)",
  "comment": "string (optional, max: 1000)"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Review updated successfully"
}
```

---

### 11.4 Get Top Reviews

**Endpoint:** `GET /reviews/top`
**Auth Required:** No

**Query Parameters:**

- `limit` (optional): number (default: 10, max: 50)
- `minRating` (optional): number (default: 4)

**Response (200):**

```json
{
  "success": true,
  "data": {
    "reviews": [
      {
        "id": "string (UUID)",
        "userName": "string",
        "userImage": "string (URL, nullable)",
        "rating": "number",
        "comment": "string",
        "cakeName": "string",
        "cakeImage": "string (URL)",
        "createdAt": "string (ISO 8601)"
      }
    ]
  }
}
```

---

## 12. File Upload APIs

### 12.1 Upload Single Image

**Endpoint:** `POST /upload/image`
**Auth Required:** Yes
**Content-Type:** multipart/form-data

**Request Body:**

```
file: image file (required, max: 5MB, formats: jpg, jpeg, png, webp)
category: string (optional, enum: 'profile', 'cake', 'custom')
```

**Response (200):**

```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "url": "string (full URL to uploaded image)",
    "filename": "string",
    "size": "number (bytes)",
    "mimeType": "string"
  }
}
```

**Error Responses:**

- 400: Invalid file format
- 413: File too large

---

### 12.2 Upload Multiple Images

**Endpoint:** `POST /upload/images`
**Auth Required:** Yes
**Content-Type:** multipart/form-data

**Request Body:**

```
files: array of image files (required, max: 10 files, 5MB each)
category: string (optional)
```

**Response (200):**

```json
{
  "success": true,
  "message": "Images uploaded successfully",
  "data": {
    "images": [
      {
        "url": "string",
        "filename": "string",
        "size": "number",
        "mimeType": "string"
      }
    ],
    "totalUploaded": "number"
  }
}
```

---

### 12.3 Delete Image

**Endpoint:** `DELETE /upload/image`
**Auth Required:** Yes

**Request Body:**

```json
{
  "url": "string (required, full URL of image to delete)"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Image deleted successfully"
}
```

---

## 13. Contact Form API

### 13.1 Submit Contact Form

**Endpoint:** `POST /contact/submit`
**Auth Required:** No

**Request Body:**

```json
{
  "name": "string (required, min: 2, max: 100)",
  "email": "string (required, valid email)",
  "phone": "string (optional, max: 20)",
  "subject": "string (required, min: 3, max: 200)",
  "message": "string (required, min: 10, max: 2000)"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Thank you for contacting us! We'll get back to you within 24-48 hours.",
  "data": {
    "contactId": "string (UUID)",
    "submittedAt": "string (ISO 8601)"
  }
}
```

**Error Responses:**

- 422: Validation error (missing required fields or invalid format)
- 429: Too many requests (rate limited to 5 submissions per hour per IP)
- 500: Server error (email service unavailable)

**Implementation Notes:**

- Rate limiting: Maximum 5 contact form submissions per hour per IP address
- Email notification: Admin receives email notification for each submission
- Auto-response: Customer receives confirmation email to provided email address
- Data storage: Contact submissions stored in database for admin review
- Spam protection: Consider implementing reCAPTCHA or similar protection

**Example Email Flow:**

1. Customer submits form
2. Backend validates and stores submission
3. Backend sends confirmation email to customer
4. Backend sends notification email to admin (info@bxcakes.com)
5. Admin can view submissions in admin panel (future feature)

---

## 14. Data Models

### User Model

```json
{
  "id": "UUID",
  "name": "string",
  "email": "string (unique)",
  "password": "string (hashed)",
  "profileImage": "string (URL, nullable)",
  "address": "string (nullable)",
  "phoneNumber": "string (nullable)",
  "personalNote": "string (nullable)",
  "role": "string (enum: 'user', 'admin', default: 'user')",
  "isEmailVerified": "boolean (default: false)",
  "resetPasswordToken": "string (nullable)",
  "resetPasswordExpires": "datetime (nullable)",
  "createdAt": "datetime",
  "updatedAt": "datetime",
  "deletedAt": "datetime (nullable, soft delete)"
}
```

---

### Order Model

```json
{
  "id": "UUID",
  "orderNumber": "string (unique, auto-generated)",
  "userId": "UUID (foreign key)",
  "orderType": "string (enum: 'custom', 'modify', 'ready-made')",
  "status": "string (enum: 'pending', 'confirmed', 'in-progress', 'completed', 'cancelled')",
  "cakeId": "UUID (nullable, for ready-made and modify)",
  "cakeDetails": "JSON",
  "totalPrice": "number (decimal)",
  "customerNote": "string (nullable)",
  "deliveryMethod": "string (enum: 'pickup', 'delivery')",
  "deliveryAddress": "string (nullable)",
  "deliveryDate": "datetime",
  "orderDate": "datetime",
  "completedAt": "datetime (nullable)",
  "cancelledAt": "datetime (nullable)",
  "cancellationReason": "string (nullable)",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

**cakeDetails JSON Structure:**

```json
{
  "shape": "string",
  "numberOfTiers": "number",
  "covering": "string",
  "tiers": [
    {
      "tierNumber": "number",
      "size": "string",
      "numberOfFlavors": "number",
      "flavors": [
        {
          "name": "string",
          "percentage": "number"
        }
      ]
    }
  ],
  "image": "string (URL, nullable)"
}
```

---

### Cake Gallery Model

```json
{
  "id": "UUID",
  "name": "string",
  "image": "string (URL)",
  "images": "JSON array of URLs",
  "shape": "string",
  "numberOfTiers": "number",
  "covering": "string",
  "price": "number (decimal)",
  "stock": "number",
  "tierDetails": "JSON",
  "category": "string",
  "event": "string",
  "gender": "string",
  "ageGroup": "string",
  "description": "string (nullable)",
  "isDeleted": "boolean (default: false)",
  "deletedAt": "datetime (nullable)",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

**tierDetails JSON Structure:**

```json
[
  {
    "tierNumber": "number",
    "size": "string",
    "flavors": ["string"],
    "measurement": "string",
    "flavorSpecification": "string"
  }
]
```

---

### Ready-Made Cake Model

```json
{
  "id": "UUID",
  "name": "string",
  "image": "string (URL)",
  "images": "JSON array of URLs",
  "price": "number (decimal, in USD)",
  "priceNGN": "number (decimal, in Naira)",
  "shape": "string",
  "numberOfTiers": "number",
  "covering": "string",
  "stock": "number",
  "sold": "number (default: 0)",
  "category": "string",
  "event": "string",
  "gender": "string",
  "ageGroup": "string",
  "description": "string",
  "fullDescription": "string (nullable)",
  "ingredients": "JSON array",
  "allergens": "JSON array",
  "servings": "number (nullable)",
  "weight": "string (nullable)",
  "dimensions": "string (nullable)",
  "tierDetails": "JSON",
  "rating": "number (decimal, 0-5, calculated)",
  "reviewCount": "number (default: 0)",
  "isDeleted": "boolean (default: false)",
  "deletedAt": "datetime (nullable)",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

---

### Customer Upload Model

```json
{
  "id": "UUID",
  "userId": "UUID (foreign key)",
  "orderId": "UUID (nullable, foreign key)",
  "image": "string (URL)",
  "shape": "string",
  "numberOfTiers": "number",
  "covering": "string",
  "tierDetails": "JSON",
  "category": "string",
  "tags": "JSON array",
  "status": "string (enum: 'pending', 'approved', 'declined')",
  "reviewedBy": "UUID (nullable, admin user ID)",
  "reviewedAt": "datetime (nullable)",
  "declineReason": "string (nullable)",
  "addedToCatalog": "boolean (default: false)",
  "catalogPrice": "number (nullable)",
  "isDeleted": "boolean (default: false)",
  "deletedAt": "datetime (nullable)",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

---

### Review Model

```json
{
  "id": "UUID",
  "orderId": "UUID (foreign key, unique)",
  "userId": "UUID (foreign key)",
  "rating": "number (1-5)",
  "comment": "string",
  "images": "JSON array of URLs",
  "isVerifiedPurchase": "boolean (default: true)",
  "helpfulCount": "number (default: 0)",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

---

### Order Timeline Model

```json
{
  "id": "UUID",
  "orderId": "UUID (foreign key)",
  "status": "string",
  "note": "string (nullable)",
  "updatedBy": "UUID (nullable, user or admin ID)",
  "updatedByType": "string (enum: 'system', 'admin', 'user')",
  "createdAt": "datetime"
}
```

---

## Additional Requirements

### 1. Currency Conversion

- Store all prices in USD in the database
- Use a conversion rate API or fixed rate (1 USD = 1600 NGN)
- Return both USD and NGN prices in all cake-related endpoints
- Allow admin to update conversion rate

**Conversion Rate Endpoint:**

```
GET /config/currency-rate
Response: { "usdToNgn": 1600 }

PUT /admin/config/currency-rate (Admin only)
Body: { "rate": 1600 }
```

---

### 2. Pagination Standard

All list endpoints should support:

```
Query Params:
- page: number (default: 1)
- limit: number (default: 10, max: 100)

Response:
{
  "data": [...],
  "pagination": {
    "currentPage": number,
    "totalPages": number,
    "totalItems": number,
    "itemsPerPage": number,
    "hasNextPage": boolean,
    "hasPreviousPage": boolean
  }
}
```

---

### 3. Error Response Format

All errors should follow this format:

```json
{
  "success": false,
  "error": {
    "code": "string (ERROR_CODE)",
    "message": "string (human-readable message)",
    "details": "object or array (optional, validation errors)",
    "timestamp": "string (ISO 8601)"
  }
}
```

**Common Error Codes:**

- `VALIDATION_ERROR` (400)
- `UNAUTHORIZED` (401)
- `FORBIDDEN` (403)
- `NOT_FOUND` (404)
- `DUPLICATE_ENTRY` (409)
- `INTERNAL_SERVER_ERROR` (500)

---

### 4. File Upload Configuration

- **Max file size:** 5MB per image
- **Allowed formats:** JPG, JPEG, PNG, WEBP
- **Storage:** AWS S3 / Cloudinary / Local storage
- **Image optimization:** Compress and resize on upload
- **Naming convention:** `{timestamp}_{uuid}_{original-name}`

---

### 5. Authentication & Security

- **JWT Token expiry:** 24 hours for regular users, 8 hours for admin
- **Refresh token:** 7 days
- **Password requirements:** Min 8 chars, 1 uppercase, 1 lowercase, 1 number
- **Rate limiting:** 100 requests per 15 minutes per IP
- **CORS:** Configure allowed origins
- **HTTPS only** in production

---

### 6. Soft Delete Policy

- Items marked as deleted stay in database for **30 days**
- After 30 days, automatically purge or move to archive
- Admin can recover within 30 days
- Admin can permanently delete before 30 days

---

### 7. Notification Requirements

- Send email on:
  - User registration (verification)
  - Password reset request
  - Order placed (confirmation)
  - Order status change
  - Review submitted
  - Admin approval/decline of customer upload

---

### 8. Date/Time Format

- **All dates:** ISO 8601 format (e.g., `2025-07-20T14:30:00Z`)
- **Timezone:** UTC in database, convert to user timezone in frontend
- **Date fields:**
  - `createdAt`: Auto-generated on create
  - `updatedAt`: Auto-updated on modify
  - `deletedAt`: Set when soft-deleted

---

### 9. Search & Filter Performance

- **Indexing required on:**

  - User: email, id
  - Order: orderNumber, userId, status
  - Cake: category, event, gender, price
  - Reviews: orderId, userId, rating

- **Full-text search fields:**
  - Cake name, description
  - User name, email
  - Order number

---

### 10. Validation Rules

**Email:**

- Valid email format
- Unique in system
- Max 255 characters

**Password:**

- Min 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character (optional but recommended)

**Phone:**

- Valid Nigerian phone format
- Optional but recommended format: +234XXXXXXXXXX

**Prices:**

- Positive numbers only
- Max 2 decimal places
- Min: 0, Max: 10,000,000

**Dates:**

- Delivery date must be at least 3 days from order date
- Cannot be in the past

**Images:**

- Valid URL format
- HTTPS only
- Max 5 images per upload

---

## Frontend Integration Notes

### 1. Toast Notifications

Frontend uses `react-hot-toast`. Backend should return clear messages for:

- Success: `{ message: "Action completed successfully" }`
- Error: `{ error: { message: "Clear error description" } }`

### 2. Form Validation

Frontend has client-side validation, but backend MUST also validate:

- All required fields
- Data types and formats
- Business logic constraints

### 3. Image Handling

Frontend expects:

- Single image URL string for profile, cake images
- Array of URLs for galleries
- Placeholder image URL if null

### 4. Currency Display

Frontend displays:

- NGN symbol: ₦
- Format: `₦50,000` (with comma separators)
- Backend should return raw numbers, frontend handles formatting

### 5. Order Numbers

Format: `ORD-12845` (prefix + 5 digits)
Should be unique and sequential

### 6. Date Display

Frontend converts ISO dates to:

- "20th July 2025" format for display
- Use ISO 8601 in API communication

---

## Testing Requirements

### Test User Accounts

Create these test accounts in seed data:

```
Regular User:
- email: test@bxcakes.com
- password: Test1234

Admin User:
- email: admin@bxcakes.com
- password: Admin1234
```

### Sample Data Required

- At least 20 ready-made cakes
- At least 10 gallery cakes
- At least 5 customer orders in different states
- At least 10 reviews (mix of ratings)

---

## WebSocket/Real-time (Optional Enhancement)

For future consideration:

- Real-time order status updates
- Admin dashboard live stats
- Customer notifications

**Suggested endpoint:**

```
WS /ws/orders/:orderId (for order status updates)
WS /ws/admin/dashboard (for admin stats)
```

---

## API Versioning

Use URL versioning:

```
/api/v1/...
```

This allows future breaking changes without affecting existing clients.

---

## Security Best Practices

### Admin Account Management

**Creating the First Admin:**

The very first admin account MUST be created through one of these secure methods:

1. **Database Seeding (Recommended for Development):**

   ```javascript
   // Backend seed script
   const bcrypt = require("bcrypt");

   const seedAdmin = async () => {
     const hashedPassword = await bcrypt.hash("SecureAdminPassword123!", 10);

     await User.create({
       name: "Super Admin",
       email: "admin@bxcakes.com",
       password: hashedPassword,
       role: "admin",
       createdAt: new Date(),
     });

     console.log("First admin account created");
   };
   ```

2. **Direct Database Insert (Production):**

   ```sql
   -- Hash the password first using bcrypt with cost factor 10
   INSERT INTO users (id, name, email, password, role, created_at)
   VALUES (
     gen_random_uuid(),
     'Super Admin',
     'admin@bxcakes.com',
     '$2b$10$HASHED_PASSWORD_HERE',  -- Use bcrypt to hash password
     'admin',
     NOW()
   );
   ```

3. **Admin CLI Tool (Most Secure for Production):**
   ```bash
   # Create a backend CLI command
   npm run create-admin -- --email=admin@bxcakes.com --name="Admin Name"
   # This should prompt for password securely
   ```

**Creating Additional Admins:**

Once the first admin exists, additional admin accounts can be created:

1. **Via Admin Panel:**

   - Login as an existing admin
   - Navigate to user management section
   - Use the "Create Admin Account" feature
   - This calls `POST /auth/admin/create` endpoint

2. **Via API (for automation):**
   ```bash
   curl -X POST https://api.bxcakes.com/api/auth/admin/create \
     -H "Authorization: Bearer ADMIN_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "New Admin",
       "email": "newadmin@bxcakes.com",
       "password": "SecurePassword123!",
       "confirmPassword": "SecurePassword123!"
     }'
   ```

### Role-Based Access Control (RBAC)

**Backend Implementation Requirements:**

1. **JWT Token Must Include Role:**

   ```javascript
   const token = jwt.sign(
     {
       userId: user.id,
       email: user.email,
       role: user.role, // CRITICAL: Include role in JWT
     },
     JWT_SECRET
   );
   ```

2. **Middleware for Admin Routes:**

   ```javascript
   const requireAdmin = (req, res, next) => {
     if (!req.user || req.user.role !== 'admin') {
       return res.status(403).json({
         success: false,
         message: 'Access denied. Admin privileges required.'
       });
     }
     next();
   };

   // Apply to admin routes
   router.post('/auth/admin/create', authenticate, requireAdmin, createAdminAccount);
   router.get('/admin/*', authenticate, requireAdmin, ...);
   ```

3. **Never Trust Client-Side Role:**
   - Always validate role from JWT token, not request body
   - Never accept 'role' parameter in signup/update endpoints
   - Always query database to verify current user's role for sensitive operations

### Security Checklist

**Public Signup Endpoint (`POST /auth/signup`):**

- ✅ Ignore any 'role' field in request body
- ✅ Always set `role = 'user'` for new accounts
- ✅ Never expose admin creation through public endpoints
- ✅ Rate limit to prevent account spam (e.g., 10 signups per hour per IP)

**Admin Creation Endpoint (`POST /auth/admin/create`):**

- ✅ Require valid JWT authentication
- ✅ Verify requesting user has 'admin' role
- ✅ Log all admin account creations for audit trail
- ✅ Send email notification to all existing admins
- ✅ Consider requiring 2FA for this operation

**Login Endpoint (`POST /auth/login`):**

- ✅ Return user role in response
- ✅ Include role in JWT token
- ✅ Frontend uses role to determine access to admin routes
- ✅ Backend still validates role on every admin endpoint

**Frontend Protection:**

- ✅ Hide admin routes from non-admin users
- ✅ Redirect non-admins away from `/admin/*` routes
- ✅ Don't expose admin creation UI to regular users
- ✅ Always verify backend responses for authorization

### Recommended Database Schema

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,  -- bcrypt hashed
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  profile_image VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  -- Prevent accidental role changes
  CONSTRAINT no_role_update CHECK (role IS NOT NULL)
);

-- Index for faster role lookups
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_email ON users(email);
```

### Environment Variables

```env
# Required for production
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=10

# Admin notifications
ADMIN_EMAIL=admin@bxcakes.com
ADMIN_NOTIFICATION_EMAIL=notifications@bxcakes.com
```

---

## Contact Information

For API questions or clarifications:

- Frontend Team: [Add contact]
- Backend Team: [Add contact]
- Project Manager: [Add contact]

---

**Document Version:** 1.1
**Last Updated:** December 31, 2025
**Status:** Ready for Backend Implementation
