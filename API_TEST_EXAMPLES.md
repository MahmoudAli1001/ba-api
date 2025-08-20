# Business Arabic API - Test Data Examples

## 📋 Quick Test Guide

### 1. Authentication (Start Here)

**Register New User:**
```json
POST /api/auth/signup
{
  "fullName": "Mahmoud Ali",
  "email": "Mahmoud.Ali.Spider@gmail.com", 
  "password": "mahmoud123456",
  "role": "admin"
}
```

**Login:**
```json
POST /api/auth/signin
{
  "email": "Mahmoud.Ali.Spider@gmail.com",
  "password": "mahmoud123456"
}
```

**Response Example:**
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "68935a15ca674df5a378c529",
    "email": "Mahmoud.Ali.Spider@gmail.com",
    "fullName": "Mahmoud Ali",
    "role": "admin"
  }
}
```

### 2. Authorization Setup

1. Copy the `token` from login response
2. Click **🔒 Authorize** button in Swagger UI
3. Enter: `Bearer YOUR_TOKEN_HERE`
4. Click "Authorize"

### 3. Test Endpoints

**Create Blog:**
```json
POST /api/blogs
{
  "title": "كيفية بناء API باستخدام Node.js - بقلم محمود علي",
  "summary": "دليل شامل لبناء API متقدمة باستخدام Node.js و TypeScript مع MongoDB",
  "content": [
    {
      "type": "paragraph",
      "text": "في هذا المقال سنتعلم كيفية بناء API احترافية باستخدام أحدث التقنيات..."
    },
    {
      "type": "code",
      "language": "javascript",
      "code": "const express = require('express');\nconst app = express();"
    }
  ],
  "image": "https://res.cloudinary.com/dwwuju96g/image/upload/v1754487500/business-arabic/blog_cover.jpg"
}
```

**Create Post:**
```json
POST /api/posts
{
  "title": "مشاركة من محمود علي",
  "content": [
    {
      "type": "paragraph", 
      "text": "اليوم تعلمت كيفية إنشاء Swagger documentation لمشروع API..."
    }
  ]
}
```

**Create Idea:**
```json
POST /api/ideas
{
  "name": "منصة تعليم البرمجة بالعربية",
  "description": "فكرة إنشاء منصة تعليمية شاملة للبرمجة باللغة العربية",
  "category": "تعليم",
  "content": [
    {
      "type": "feature",
      "title": "دروس تفاعلية",
      "description": "دروس فيديو باللغة العربية مع أمثلة عملية"
    }
  ]
}
```

**Create Project:**
```json
POST /api/projects
{
  "name": "Business Arabic API",
  "description": "API شاملة لإدارة المحتوى والمستخدمين بالعربية",
  "price": "مجاني",
  "category": "تطوير ويب",
  "image": "https://res.cloudinary.com/dwwuju96g/image/upload/v1754487500/business-arabic/project_logo.jpg"
}
```

**Upload File:**
- Select any image file (JPG, PNG, GIF, WebP)
- Max size: 5MB
- Will be uploaded to Cloudinary

### 4. Test Data Summary

**Your Test Account:**
- Name: Mahmoud Ali
- Email: Mahmoud.Ali.Spider@gmail.com
- Password: mahmoud123456
- Role: admin (can access all endpoints)

**Sample Content Topics:**
- Node.js development guides
- API design best practices  
- Arabic programming tutorials
- Web development projects
- Technical blog posts

### 5. Common Test Scenarios

1. **Register → Login → Get Token → Upload Image → Create Blog with Image**
2. **Login → Create Multiple Posts → Get All Posts → Update Post**
3. **Login → Create Idea → Create Project → Test Admin-only endpoints**
4. **Test pagination and filtering on GET endpoints**
5. **Test validation errors with invalid data**

### 6. Expected Response Format

All successful responses follow this pattern:
```json
{
  "status": "success",
  "data": { /* your data */ },
  "pagination": { /* if applicable */ }
}
```

Error responses:
```json
{
  "status": "error", 
  "message": "Description of error",
  "statusCode": 400
}
```
