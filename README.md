## Database connection creation

- npm install mongodb
- install mongoose
- set mongodb atlas
- create .env file
- Create file @/lib/bd.ts
- create API Route (POST) app/api/test/route.ts

## Model Creation for Category:

- Create a folder named models in root.
- create Category.ts (Category model)
- create API Route (POST) app/api/category/route.ts

## Category request send from frontend

- create file (root)/admin/dashboard/category/add/page.tsx

## store management

- install redux @reduxjs/toolkit & react-redux
  A. Create productSlice.ts file inside app/features/product folder
  B. Create store.ts file inside app/store folder
  C. Create a provider.tsx file inside app folder and wrap {children} inside app/layout.tsx
  C. Create hooks.ts file inside store folder
  D. Create useProduct.ts file inside features/product folder
