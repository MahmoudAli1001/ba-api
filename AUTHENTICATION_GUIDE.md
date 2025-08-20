# 🔐 API Authentication Guide - Step by Step

## Quick Fix for "Please authenticate" Error

The error `{"error": "Please authenticate."}` means you need to include your JWT token in the request. Here's how:

## 📋 Step-by-Step Authentication Process

### Step 1: Get Your JWT Token
1. **Go to Swagger UI**: http://localhost:3000/api-docs
2. **Find the Authentication section** (should be at the top)
3. **Test signup endpoint** with these credentials:
   ```json
   {
     "email": "Mahmoud.Ali.Spider@gmail.com",
     "password": "mahmoud123456",
     "fullName": "Mahmoud Ali",
     "role": "admin"
   }
   ```
4. **OR Test signin endpoint** if you already signed up:
   ```json
   {
     "email": "Mahmoud.Ali.Spider@gmail.com",
     "password": "mahmoud123456"
   }
   ```

### Step 2: Copy Your Token
After successful login, you'll get a response like:
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODkzNWQ1ZjVlZTQ1ZjNkNTQ4ZjFlOTciLCJpYXQiOjE3NTQ0ODgxNTksImV4cCI6MTc1NDU3NDU1OX0.iq7mE1lw5CWZrdaHLT1LWzSnJmo4cFoZdYsuwsIRG28",
  "user": { ... }
}
```

**🚨 IMPORTANT: Copy the entire token value (the long string after "token":)**

### Step 3: Authorize in Swagger UI
1. **Look for the "Authorize" button** at the top of the Swagger UI (green lock icon)
2. **Click "Authorize"**
3. **In the popup, enter your token in this format:**
   ```
   Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODkzNWQ1ZjVlZTQ1ZjNkNTQ4ZjFlOTciLCJpYXQiOjE3NTQ0ODgxNTksImV4cCI6MTc1NDU3NDU1OX0.iq7mE1lw5CWZrdaHLT1LWzSnJmo4cFoZdYsuwsIRG28
   ```
   
   **⚠️ Note: Make sure to include "Bearer " (with space) before your token!**

4. **Click "Authorize"** button in the popup
5. **Click "Close"**

### Step 4: Test Protected Endpoints
Now you can test any protected endpoint like:
- 📁 **File Upload** (`/api/media`)
- 👤 **User Profile** (`/api/users/profile`)
- 📝 **Posts, Blogs, Ideas, Projects**

## 🔧 Alternative Methods

### If Swagger Authorization Doesn't Work:

#### Method 1: Manual Header in Swagger
1. Find any protected endpoint (like `/api/media`)
2. Click "Try it out"
3. In the **Headers** section, add:
   - **Key**: `Authorization`
   - **Value**: `Bearer YOUR_TOKEN_HERE`

#### Method 2: Using Postman/cURL
```bash
curl -X POST "http://localhost:3000/api/media" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@path/to/your/file.jpg"
```

## 📝 Your Current Token
From your last login, your token is:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODkzNWQ1ZjVlZTQ1ZjNkNTQ4ZjFlOTciLCJpYXQiOjE3NTQ0ODgxNTksImV4cCI6MTc1NDU3NDU1OX0.iq7mE1lw5CWZrdaHLT1LWzSnJmo4cFoZdYsuwsIRG28
```

**So in Swagger, click Authorize and enter:**
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODkzNWQ1ZjVlZTQ1ZjNkNTQ4ZjFlOTciLCJpYXQiOjE3NTQ0ODgxNTksImV4cCI6MTc1NDU3NDU1OX0.iq7mE1lw5CWZrdaHLT1LWzSnJmo4cFoZdYsuwsIRG28
```

## ❓ Troubleshooting

### Still getting "Please authenticate" error?
1. **Check token format**: Must start with `Bearer ` (with space)
2. **Check token expiry**: Tokens expire after 24 hours
3. **Check spelling**: Make sure "Bearer" is spelled correctly
4. **Try re-login**: Get a fresh token if yours is old

### Common Mistakes:
- ❌ Forgetting "Bearer " prefix
- ❌ Extra spaces or quotes around token
- ❌ Using expired token
- ❌ Not clicking "Authorize" after entering token

## 🎯 Quick Test
1. Go to: http://localhost:3000/api-docs
2. Click "Authorize" (green lock icon)
3. Enter: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODkzNWQ1ZjVlZTQ1ZjNkNTQ4ZjFlOTciLCJpYXQiOjE3NTQ0ODgxNTksImV4cCI6MTc1NDU3NDU1OX0.iq7mE1lw5CWZrdaHLT1LWzSnJmo4cFoZdYsuwsIRG28`
4. Click "Authorize"
5. Test `/api/media` or any other protected endpoint

That should fix your authentication issue! 🎉
