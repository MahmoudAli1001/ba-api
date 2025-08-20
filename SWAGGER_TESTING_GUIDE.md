# 🚀 Swagger API Documentation - Business Arabic API

## 📍 **Access Your API Documentation**

### **Interactive Swagger UI**
```
🌐 http://localhost:8080/api-docs
```

### **API Overview**
```
🌐 http://localhost:8080
```

---

## 🧪 **How to Test Your API with Swagger**

### **1. Start the Server**
```bash
npm run dev
```

### **2. Open Swagger Documentation**
- Navigate to: `http://localhost:8080/api-docs`
- You'll see an interactive API documentation interface

### **3. Test Authentication**

#### **Sign Up (Create Account)**
1. Go to **Authentication** section
2. Click on **POST /api/auth/signup**
3. Click **"Try it out"**
4. Enter test data:
   ```json
   {
     "name": "أحمد محمد",
     "email": "ahmed@example.com",
     "password": "password123"
   }
   ```
5. Click **"Execute"**
6. Copy the returned `token` from response

#### **Sign In (Login)**
1. Click on **POST /api/auth/signin**
2. Click **"Try it out"**
3. Enter credentials:
   ```json
   {
     "email": "ahmed@example.com",
     "password": "password123"
   }
   ```
4. Click **"Execute"**
5. Copy the `token` from response

### **4. Authorize API Calls**
1. Click the **🔒 Authorize** button at the top
2. Enter: `Bearer YOUR_TOKEN_HERE`
   ```
   Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
3. Click **"Authorize"**
4. Now you can test protected endpoints!

### **5. Test File Upload**
1. Go to **Media** section
2. Click **POST /api/media**
3. Click **"Try it out"**
4. Click **"Choose File"** and select an image
5. Click **"Execute"**
6. You'll get back a Cloudinary URL!

### **6. Test Blog Operations**
1. **Create Blog** (Admin only):
   ```json
   {
     "title": "مقدمة في اللغة العربية للأعمال",
     "content": "محتوى المقال باللغة العربية...",
     "tags": ["أعمال", "لغة", "تعليم"]
   }
   ```

2. **Get All Blogs** (No auth required):
   - Just click "Execute" to see all blogs

3. **Get Blog by ID**:
   - Enter a blog ID from the list
   - Click "Execute"

---

## 🔧 **API Features Available for Testing**

### ✅ **Authentication**
- [x] User Registration (`POST /api/auth/signup`)
- [x] User Login (`POST /api/auth/signin`)

### ✅ **File Upload**
- [x] Image Upload to Cloudinary (`POST /api/media`)

### ✅ **Blog Management**
- [x] Create Blog Post (`POST /api/blog`) - Admin only
- [x] Get All Blogs (`GET /api/blog`)
- [x] Get Blog by ID (`GET /api/blog/{id}`)
- [x] Update Blog (`PATCH /api/blog/{id}`) - Admin only
- [x] Delete Blog (`DELETE /api/blog/{id}`) - Admin only

### 🔄 **Coming Soon** (Ready for testing when needed)
- [ ] Posts Management
- [ ] Ideas Club
- [ ] Launched Projects
- [ ] User Management

---

## 🎯 **Testing Scenarios**

### **Scenario 1: Complete User Journey**
1. Register new user
2. Login to get token
3. Upload profile image
4. View available blogs
5. (Admin) Create new blog post

### **Scenario 2: File Upload Testing**
1. Login as user
2. Test different image formats (PNG, JPG, GIF)
3. Test file size limits (max 5MB)
4. Verify Cloudinary URLs work

### **Scenario 3: Error Handling**
1. Try invalid login credentials
2. Try accessing admin endpoints as regular user
3. Try uploading non-image files
4. Try uploading files > 5MB

---

## 📊 **API Status**

| Feature | Status | Swagger Docs | Testing Ready |
|---------|--------|--------------|---------------|
| Authentication | ✅ Complete | ✅ Yes | ✅ Ready |
| File Upload | ✅ Complete | ✅ Yes | ✅ Ready |
| Blog Management | ✅ Complete | ✅ Yes | ✅ Ready |
| Error Handling | ✅ Complete | ✅ Yes | ✅ Ready |

---

## 💡 **Tips for Testing**

1. **Always authorize first** for protected endpoints
2. **Use realistic test data** (Arabic text works great!)
3. **Test error cases** to see proper error responses
4. **File uploads** return Cloudinary URLs you can visit
5. **Check response schemas** match what you expect

---

## 🌐 **Next Steps**

1. **Add remaining endpoints** to Swagger (Posts, Ideas, Projects)
2. **Set up automated testing** with Jest + Supertest
3. **Deploy to production** with proper environment variables
4. **Add rate limiting** and security headers

**Ready to test! 🚀**
