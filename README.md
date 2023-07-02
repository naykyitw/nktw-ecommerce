This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Folder Structure

Refer to the folder structure and its respective definitions below for your reference.

```

├── components --------------------------------- Folder for shared components
│   ├── layout --------------------------------- Folder for Layout components, comprising of Nav Bar
│   └── shared --------------------------------- Folder for shared components related to web page
│       └── <component folder> ----------------- Folder for specific shared page component
├── pages -------------------------------------- Folder for webpage, read note below for more details*
│   ├── <page folder> -------------------------- Folder for specific page
│   │   └── index.js --------------------------- Index.js file is the entry point for the page routing
│   ├── _app.js -------------------------------- Custom App component to initialize pages, read note below for more details*
├── | images ----------------------------------- Folder for images
├── styles ------------------------------------- Styles related folder, mainly for global.css
│   └── globals.css ---------------------------- CSS styling that are applied globally, read note below for more details*
└── README.md ---------------------------------- General Readme about setup and installation
```

# Pages Info

Catalog Page:

- List of products showcased in a grid format
- Ability to filter products based on categories

Product Detail Page:

- Detailed view of a specific product
- Option to add or remove the product from the cart
- Swiper Library is utilized to show Carousel of Product Photos

Cart Page:

- Management of the shopping cart
- Ability to add, reduce quantity, or remove products from the cart
- Real-time calculation of prices, including the cart summary total, based on the quantity changes in the cart.

## Key Points about my development

- Responsive Design: The website has been designed to provide a smooth user experience across different devices and screen sizes. It demonstrates my proficient knowledge of CSS fundamentals and showcases my ability to create custom solutions according to project requirements. Maintain consistent element sizing to prevent unexpected layout shifts.
- Tailwind CSS: I have utilized Tailwind CSS in certain components of the website. While I am still in the process of learning more about Tailwind CSS, I am excited about exploring its capabilities and incorporating it further into my projects.
- Storing Shopping Cart: To ensure the live storage of shopping cart information, I have implemented the zustand Store library.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
