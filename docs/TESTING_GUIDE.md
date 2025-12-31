# 🧪 Backend Integration Testing Guide

## ✅ Backend Implementation Verified

This guide will help you test and verify that all backend updates are working correctly with your frontend application.

---

## 🎯 Testing Checklist

### Phase 1: Authentication & User Management

#### ✅ Test 1.1: Regular User Signup

**Endpoint:** `POST /auth/signup`

**Test Steps:**

1. Navigate to `/signup`
2. Fill in form with:
   - Name: "Test User"
   - Email: "testuser@example.com"
   - Password: "Test1234!" (8+ chars, uppercase, lowercase, number)
   - Confirm Password: "Test1234!"
3. Submit form

**Expected Results:**

- ✅ Success toast: "Account created successfully!"
- ✅ Redirected to home page
- ✅ User is logged in
- ✅ NavBar shows profile picture/name
- ✅ User role is "user" (check localStorage)
- ❌ No "Admin Dashboard" link visible

**Verify in localStorage:**

```javascript
// Open browser console
const user = JSON.parse(localStorage.getItem("user"));
console.log(user.role); // Should be "user", NOT "admin"
```

---

#### ✅ Test 1.2: Admin Cannot Be Created via Signup

**Endpoint:** `POST /auth/signup`

**Test Steps:**

1. Try to signup with manipulated request (using browser DevTools Network tab)
2. Add `"role": "admin"` to request body

**Expected Results:**

- ✅ Account still created with role "user"
- ✅ Backend ignores the "role" field
- ❌ User does NOT get admin privileges

---

#### ✅ Test 1.3: User Login

**Endpoint:** `POST /auth/login`

**Test Steps:**

1. Navigate to `/login`
2. Enter credentials:
   - Email: "testuser@example.com"
   - Password: "Test1234!"
3. Submit form

**Expected Results:**

- ✅ Success toast: "Login successful"
- ✅ Redirected to home page
- ✅ JWT token stored in localStorage
- ✅ User data stored in localStorage with correct role

---

#### ✅ Test 1.4: Admin Login

**Endpoint:** `POST /auth/login`

**Prerequisites:** Backend team must have created an admin account

**Test Steps:**

1. Navigate to `/login`
2. Enter admin credentials (from backend team)
3. Submit form

**Expected Results:**

- ✅ Success toast: "Login successful"
- ✅ Redirected to home page
- ✅ NavBar shows "Admin Dashboard" link
- ✅ Can access `/admin` routes

**Verify in localStorage:**

```javascript
const user = JSON.parse(localStorage.getItem("user"));
console.log(user.role); // Should be "admin"
```

---

#### ✅ Test 1.5: Password Reset Flow

**Endpoints:**

- `POST /auth/password-reset`
- `POST /auth/password-reset/confirm`

**Test Steps:**

1. Navigate to `/passwordReset`
2. Enter email address
3. Submit form
4. Check email for reset link
5. Click reset link
6. Enter new password

**Expected Results:**

- ✅ Success toast after requesting reset
- ✅ Email received with reset link
- ✅ Password successfully changed
- ✅ Can login with new password

---

### Phase 2: User Profile Management

#### ✅ Test 2.1: Get User Profile

**Endpoint:** `GET /user/profile`

**Test Steps:**

1. Login as any user
2. Navigate to `/profile`

**Expected Results:**

- ✅ Profile page loads with user data
- ✅ Shows: name, email, profile image, total orders, total spent
- ✅ Data loads from cache first (instant)
- ✅ Updates silently in background

---

#### ✅ Test 2.2: Update User Profile

**Endpoint:** `PUT /user/profile`

**Test Steps:**

1. Navigate to `/editProfile`
2. Update fields: name, address, phone, personal note
3. Click "Save Changes"

**Expected Results:**

- ✅ Success toast: "Profile updated successfully"
- ✅ Changes reflected immediately
- ✅ Data persists after page reload

---

#### ✅ Test 2.3: Upload Profile Picture

**Endpoint:** `POST /user/profile/picture`

**Test Steps:**

1. Navigate to `/editProfile`
2. Click profile picture area
3. Select image file (< 5MB, jpg/png)
4. Upload

**Expected Results:**

- ✅ Success toast: "Profile picture uploaded"
- ✅ New image displayed immediately
- ✅ Image URL stored in database
- ✅ Shows in NavBar and profile page

---

#### ✅ Test 2.4: Update Email

**Endpoint:** `PUT /user/settings/email`

**Test Steps:**

1. Navigate to `/settings`
2. Enter new email
3. Save changes

**Expected Results:**

- ✅ Success toast
- ✅ Email updated in database
- ✅ Can login with new email

---

#### ✅ Test 2.5: Change Password

**Endpoint:** `PUT /user/settings/password`

**Test Steps:**

1. Navigate to `/settings`
2. Enter current password
3. Enter new password (8+ chars, complexity)
4. Confirm new password
5. Save

**Expected Results:**

- ✅ Success toast: "Password changed successfully"
- ✅ Can login with new password
- ❌ Old password no longer works

---

### Phase 3: Cake Browsing & Ordering

#### ✅ Test 3.1: Browse Ready-Made Cakes

**Endpoint:** `GET /cakes/ready-made`

**Test Steps:**

1. Navigate to `/readymade-cake`
2. Try filters: category, price range, search
3. Try pagination

**Expected Results:**

- ✅ Cakes display in grid
- ✅ Filters work correctly
- ✅ Search returns relevant results
- ✅ Pagination works
- ✅ Category counts accurate

---

#### ✅ Test 3.2: View Cake Details

**Endpoint:** `GET /cakes/ready-made/:id`

**Test Steps:**

1. Click any cake card
2. View details page

**Expected Results:**

- ✅ Full cake details displayed
- ✅ Multiple images shown
- ✅ Price, rating, reviews visible
- ✅ "Add to Cart" or "Order" button works

---

#### ✅ Test 3.3: Custom Cake Order

**Endpoint:** `POST /orders/custom-cake`

**Test Steps:**

1. Navigate to `/customize-cake`
2. Select: shape, tiers, covering, flavors
3. Add delivery details
4. Submit order

**Expected Results:**

- ✅ Price calculated correctly
- ✅ Order submitted successfully
- ✅ Order appears in order history
- ✅ Order has "pending" status

---

#### ✅ Test 3.4: Modify Existing Cake

**Endpoint:** `POST /orders/modify-cake`

**Test Steps:**

1. Navigate to `/modify-cake`
2. Select a base cake
3. Customize: shape, tiers, flavors
4. Submit order

**Expected Results:**

- ✅ Modifications saved
- ✅ Price adjusted correctly
- ✅ Order created successfully

---

#### ✅ Test 3.5: Ready-Made Cake Order

**Endpoint:** `POST /orders/ready-made`

**Test Steps:**

1. Select a ready-made cake
2. Choose quantity
3. Select delivery method
4. Submit order

**Expected Results:**

- ✅ Order created
- ✅ Stock updated (decreased)
- ✅ Order in history

---

### Phase 4: Order Management

#### ✅ Test 4.1: View Order History

**Endpoint:** `GET /user/orders`

**Test Steps:**

1. Navigate to `/order-history`
2. Try filters: status, category, price range

**Expected Results:**

- ✅ All user orders displayed
- ✅ Filters work correctly
- ✅ Order details accurate
- ✅ Status badges correct

---

#### ✅ Test 4.2: View Order Details

**Endpoint:** `GET /orders/:id`

**Test Steps:**

1. Click any order
2. View full details

**Expected Results:**

- ✅ Complete order information
- ✅ Timeline/status history
- ✅ Customer notes visible
- ✅ Price breakdown accurate

---

#### ✅ Test 4.3: Reorder Previous Order

**Endpoint:** `POST /orders/:id/reorder`

**Test Steps:**

1. Navigate to order history
2. Click "Reorder" on any order
3. Confirm and submit

**Expected Results:**

- ✅ New order created with same specs
- ✅ Can modify delivery date
- ✅ New order appears in history

---

### Phase 5: Reviews

#### ✅ Test 5.1: Add Review

**Endpoint:** `POST /reviews`

**Test Steps:**

1. Navigate to completed order
2. Click "Add Review"
3. Rate (1-5 stars) and comment
4. Submit

**Expected Results:**

- ✅ Review saved successfully
- ✅ Order marked as reviewed
- ✅ Review appears in top reviews

---

#### ✅ Test 5.2: View Top Reviews

**Endpoint:** `GET /reviews/top`

**Test Steps:**

1. Navigate to home page
2. Scroll to reviews section

**Expected Results:**

- ✅ Top 3 reviews displayed
- ✅ Shows user name, rating, comment
- ✅ Profile images displayed

---

#### ✅ Test 5.3: Update Review

**Endpoint:** `PUT /reviews/:id`

**Test Steps:**

1. Navigate to your review
2. Click "Edit"
3. Update rating/comment
4. Save

**Expected Results:**

- ✅ Review updated successfully
- ✅ Changes reflected immediately

---

### Phase 6: Admin Panel (Admin Users Only)

#### ✅ Test 6.1: Access Admin Panel

**Test Steps:**

1. Login as admin user
2. Click "Admin Dashboard" in NavBar
3. Navigate to `/admin`

**Expected Results:**

- ✅ Dashboard loads with stats
- ✅ Shows: total orders, revenue, cakes
- ✅ Recent orders table displayed

---

#### ✅ Test 6.2: Regular User Cannot Access Admin

**Test Steps:**

1. Login as regular user
2. Try to access `/admin` directly

**Expected Results:**

- ❌ Redirected to home page
- ❌ Error toast: "Access denied. Admin privileges required"
- ❌ No admin link in NavBar

---

#### ✅ Test 6.3: Admin Dashboard Stats

**Endpoint:** `GET /admin/dashboard/stats`

**Test Steps:**

1. Login as admin
2. View dashboard
3. Try different time periods (today, week, month)

**Expected Results:**

- ✅ Stats load correctly
- ✅ Numbers update based on period
- ✅ Charts/graphs display (if implemented)

---

#### ✅ Test 6.4: Manage Cake Gallery

**Endpoints:**

- `GET /admin/cake-gallery`
- `POST /admin/cake-gallery`
- `PUT /admin/cake-gallery/:id`
- `DELETE /admin/cake-gallery/:id`

**Test Steps:**

1. Navigate to `/admin/cake-gallery`
2. Add new cake
3. Edit existing cake
4. Delete cake
5. Recover deleted cake

**Expected Results:**

- ✅ Can add cakes with image upload
- ✅ Can edit cake details
- ✅ Deleted cakes move to trash
- ✅ Can recover within 30 days

---

#### ✅ Test 6.5: Manage Ready-Made Cakes

**Endpoints:**

- `GET /admin/ready-made-cakes`
- `POST /admin/ready-made-cakes`
- `PUT /admin/ready-made-cakes/:id/mark-sold`
- `DELETE /admin/ready-made-cakes/:id`

**Test Steps:**

1. Navigate to `/admin/ready-made-cakes`
2. Add new ready-made cake
3. Mark some as sold
4. Delete cake

**Expected Results:**

- ✅ Cakes appear on public shop
- ✅ Stock decreases when sold
- ✅ Deleted cakes removed from shop

---

#### ✅ Test 6.6: Customer Uploads Review

**Endpoints:**

- `GET /admin/customer-uploads/reviews`
- `POST /admin/customer-uploads/:id/approve`
- `POST /admin/customer-uploads/:id/decline`

**Test Steps:**

1. Navigate to `/admin/customer-uploads/review`
2. Review pending customer uploads
3. Approve some
4. Decline others

**Expected Results:**

- ✅ Pending uploads displayed
- ✅ Can approve and add to gallery
- ✅ Can decline with reason
- ✅ Notifications sent (if implemented)

---

#### ✅ Test 6.7: Order Management

**Endpoints:**

- `GET /admin/orders`
- `GET /admin/orders/:id`
- `PUT /admin/orders/:id/status`

**Test Steps:**

1. Navigate to `/admin/order-history`
2. View all orders
3. Update order status
4. View order details

**Expected Results:**

- ✅ All orders displayed
- ✅ Can filter by status, category
- ✅ Status updates in real-time
- ✅ Timeline shows all changes

---

#### ✅ Test 6.8: Create Admin Account (Admin Only)

**Endpoint:** `POST /auth/admin/create`

**Prerequisites:** Must be logged in as admin

**Test Steps:**

1. Use API testing tool (Postman/curl)
2. Send POST request with admin JWT token:

```bash
curl -X POST https://bx-cakes-backend.onrender.com/api/auth/admin/create \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Admin",
    "email": "newadmin@bxcakes.com",
    "password": "Admin1234!",
    "confirmPassword": "Admin1234!"
  }'
```

**Expected Results:**

- ✅ New admin account created
- ✅ Can login with new admin credentials
- ✅ Has admin dashboard access

**Try as regular user:**

- ❌ Request fails with 403 Forbidden
- ❌ Error: "Access denied. Admin privileges required"

---

### Phase 7: Contact Form

#### ✅ Test 7.1: Submit Contact Form

**Endpoint:** `POST /contact/submit`

**Test Steps:**

1. Navigate to `/contact`
2. Fill in form:
   - Name (2+ chars)
   - Email (valid format)
   - Phone (optional)
   - Subject (3+ chars)
   - Message (10+ chars)
3. Submit

**Expected Results:**

- ✅ Success toast with confirmation message
- ✅ Form clears after submission
- ✅ Admin receives email notification
- ✅ Customer receives confirmation email

---

#### ✅ Test 7.2: Contact Form Validation

**Test Steps:**

1. Try submitting with invalid data:
   - Short name (< 2 chars)
   - Invalid email
   - Short subject (< 3 chars)
   - Short message (< 10 chars)

**Expected Results:**

- ❌ Error toast for each validation failure
- ❌ Form not submitted
- ✅ Clear error messages

---

#### ✅ Test 7.3: Contact Form Rate Limiting

**Test Steps:**

1. Submit contact form 5 times quickly
2. Try 6th submission

**Expected Results:**

- ✅ First 5 submissions succeed
- ❌ 6th submission fails with 429 error
- ❌ Error toast: "Too many requests"

---

### Phase 8: Caching & Performance

#### ✅ Test 8.1: Profile Page Cache

**Test Steps:**

1. Login and visit `/profile`
2. Note load time
3. Navigate away
4. Return to `/profile`

**Expected Results:**

- ✅ First visit: fetches from API
- ✅ Second visit: loads instantly from cache
- ✅ Background refresh updates data
- ✅ No visible loading on return visits

---

#### ✅ Test 8.2: Category Counts Cache

**Test Steps:**

1. Visit home page
2. Note category counts
3. Refresh page
4. Check category counts again

**Expected Results:**

- ✅ First load: fetches counts
- ✅ Subsequent loads: instant from cache
- ✅ Counts remain accurate

---

#### ✅ Test 8.3: Rate Limiting Handling

**Test Steps:**

1. Navigate between profile pages rapidly
2. Trigger 429 rate limit error

**Expected Results:**

- ✅ No error toast shown
- ✅ App continues working
- ✅ Uses cached data gracefully
- ✅ No blank screens

---

### Phase 9: Security Tests

#### ✅ Test 9.1: JWT Token Expiration

**Test Steps:**

1. Login
2. Wait for token to expire (7 days or as configured)
3. Try to access protected route

**Expected Results:**

- ❌ 401 Unauthorized error
- ✅ Redirected to login
- ✅ Error toast: "Session expired"
- ✅ localStorage cleared

---

#### ✅ Test 9.2: Invalid Token

**Test Steps:**

1. Login
2. Manually modify JWT in localStorage
3. Try to access protected route

**Expected Results:**

- ❌ 401 Unauthorized error
- ✅ Redirected to login
- ✅ Token removed from localStorage

---

#### ✅ Test 9.3: Role Tampering Attempt

**Test Steps:**

1. Login as regular user
2. Open browser console
3. Try to change role:

```javascript
let user = JSON.parse(localStorage.getItem("user"));
user.role = "admin";
localStorage.setItem("user", JSON.stringify(user));
```

4. Try to access `/admin`

**Expected Results:**

- ✅ Frontend checks role and redirects
- ❌ Even if frontend bypassed, backend rejects API calls
- ❌ 403 Forbidden on admin API calls
- ✅ Cannot create orders or access admin data

---

### Phase 10: Error Handling

#### ✅ Test 10.1: Network Errors

**Test Steps:**

1. Disconnect internet
2. Try various actions

**Expected Results:**

- ✅ Error toasts with clear messages
- ✅ App doesn't crash
- ✅ Cached data still accessible
- ✅ Actions queue for retry (if implemented)

---

#### ✅ Test 10.2: 404 Errors

**Test Steps:**

1. Navigate to `/nonexistent-page`
2. Try accessing invalid order ID

**Expected Results:**

- ✅ 404 page displayed
- ✅ Clear message to user
- ✅ Link back to home

---

#### ✅ Test 10.3: Validation Errors

**Test Steps:**

1. Submit forms with invalid data
2. Check error messages

**Expected Results:**

- ✅ Client-side validation catches errors
- ✅ Backend validation provides fallback
- ✅ Clear, specific error messages
- ✅ Field-specific error highlighting

---

## 🐛 Common Issues & Solutions

### Issue 1: "Access Denied" on Admin Panel

**Cause:** User doesn't have admin role

**Check:**

```javascript
// Browser console
const user = JSON.parse(localStorage.getItem("user"));
console.log("Role:", user.role);
```

**Solution:** Backend team must update user role in database or create admin via secure method

---

### Issue 2: Images Not Uploading

**Possible Causes:**

- File too large (> 5MB)
- Invalid format (not jpg/png)
- Missing multipart/form-data header

**Solution:** Check network tab for specific error, verify file meets requirements

---

### Issue 3: Orders Not Appearing

**Possible Causes:**

- Wrong user ID in database
- Order status filter active
- Pagination issue

**Solution:** Check database for order with user_id, verify API returns orders

---

### Issue 4: 429 Rate Limit Errors

**Cause:** Too many requests in short time

**Solution:**

- Caching implemented for most routes
- Wait a few minutes
- Backend team can adjust rate limits if too strict

---

### Issue 5: CORS Errors

**Cause:** Backend not configured for frontend domain

**Solution:** Backend team must add frontend URL to CORS whitelist

---

## ✅ Completion Checklist

### Authentication ✓

- [ ] Regular user signup works
- [ ] Admin role protected from public signup
- [ ] Login returns correct role in JWT
- [ ] Password reset flow complete
- [ ] Session management working

### User Profile ✓

- [ ] Profile data loads and caches
- [ ] Updates save correctly
- [ ] Profile picture upload works
- [ ] Email/password change functional

### Shopping & Orders ✓

- [ ] Browse cakes with filters
- [ ] Custom cake orders work
- [ ] Modify cake orders work
- [ ] Ready-made orders work
- [ ] Order history displays correctly

### Reviews ✓

- [ ] Can add reviews to completed orders
- [ ] Top reviews display on homepage
- [ ] Can edit own reviews

### Admin Panel ✓

- [ ] Admin login grants access
- [ ] Dashboard stats accurate
- [ ] Can manage cake gallery
- [ ] Can manage ready-made cakes
- [ ] Can review customer uploads
- [ ] Can manage orders
- [ ] Can create admin accounts (via API)
- [ ] Regular users cannot access

### Security ✓

- [ ] JWT authentication working
- [ ] Role-based access control enforced
- [ ] Admin routes protected
- [ ] Token expiration handled
- [ ] Rate limiting in place

### Performance ✓

- [ ] Caching reduces API calls
- [ ] Pages load quickly
- [ ] Images optimized
- [ ] No memory leaks

### Error Handling ✓

- [ ] Clear error messages
- [ ] Graceful degradation
- [ ] 404 page works
- [ ] Network errors handled

---

## 📊 Performance Metrics to Track

1. **Average Page Load Time:** < 2 seconds
2. **API Response Time:** < 500ms
3. **Image Load Time:** < 1 second
4. **Cache Hit Rate:** > 80%
5. **Error Rate:** < 1%

---

## 🚀 Production Readiness

Before going live, verify:

- [ ] All test cases pass
- [ ] No console errors
- [ ] All links work
- [ ] Mobile responsive
- [ ] Images display correctly
- [ ] Forms validate properly
- [ ] Email notifications working
- [ ] Payment integration (if applicable)
- [ ] SSL certificate installed
- [ ] Environment variables set
- [ ] Database backups configured
- [ ] Monitoring/logging active
- [ ] Error tracking (Sentry/similar)

---

## 📞 Support Contacts

**Frontend Issues:**

- Check browser console for errors
- Review network tab for failed requests
- Check localStorage for corrupt data

**Backend Issues:**

- Check API response status codes
- Review API documentation
- Contact backend team with error logs

**Emergency Contacts:**

- Frontend Lead: [Ademola Ademeso](https://ademolaademeso.vercel.app/)
- Backend Lead: [Oluwole Afolabi](https://oluwoleafolabi.vercel.app/)

---

**Testing Guide Version:** 1.0  
**Last Updated:** December 31, 2025  
**Status:** Ready for Integration Testing
