import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Red Radiance – Best Ladies Salon in Keelkattalai, Chennai" },
      {
        name: "description",
        content: "Red Radiance – Chennai's top ladies beauty salon in Keelkattalai. Expert hair coloring, hair spa, bridal makeup, facial, waxing & more since 2011. Open daily 10AM–9PM. Book: +91 95978 14476",
      },
      {
        name: "keywords",
        content: "ladies salon Chennai, beauty salon Keelkattalai, ladies parlour Chennai, best ladies salon near me, bridal makeup Chennai, hair spa Chennai, hair coloring Chennai, facial Chennai, waxing salon Chennai, threading Chennai, pedicure manicure Chennai, skin brightening Chennai, bridal package Chennai, saree draping Chennai, ladies salon near Medavakkam, ladies salon near Velachery, ladies salon south Chennai, beauty parlour near me, salon open Sunday Chennai, premium ladies salon Chennai",
      },
      { name: "author", content: "Red Radiance" },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#C00000" },
      // Geo tags for local SEO
      { name: "geo.region", content: "IN-TN" },
      { name: "geo.placename", content: "Keelkattalai, Chennai, Tamil Nadu, India" },
      { name: "geo.position", content: "12.9563;80.1963" },
      { name: "ICBM", content: "12.9563, 80.1963" },
      // Open Graph
      { property: "og:title", content: "Red Radiance – Best Ladies Salon in Keelkattalai, Chennai" },
      {
        property: "og:description",
        content: "Premium ladies beauty salon in Keelkattalai, Chennai. Expert hair, skin, bridal & beauty services since 2011. Open daily 10AM–9PM.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://redradiance.in/" },
      { property: "og:image", content: "https://redradiance.in/images/logo.png" },
      { property: "og:image:alt", content: "Red Radiance Ladies Salon – Keelkattalai, Chennai" },
      { property: "og:site_name", content: "Red Radiance" },
      { property: "og:locale", content: "en_IN" },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Red Radiance – Best Ladies Salon in Keelkattalai, Chennai" },
      { name: "twitter:description", content: "Premium ladies beauty salon in Chennai. Hair, skin, bridal & beauty services. Open daily 10AM–9PM." },
      { name: "twitter:image", content: "https://redradiance.in/images/logo.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/images/logo.png", type: "image/png" },
      { rel: "canonical", href: "https://redradiance.in/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600;1,700&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BeautySalon",
          "name": "Red Radiance",
          "description": "Premium ladies beauty salon in Keelkattalai, Chennai offering expert hair, skin, bridal and beauty services since 2011.",
          "url": "https://redradiance.in",
          "telephone": "+919597814476",
          "foundingDate": "2011",
          "priceRange": "₹₹",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "No.12/1, Senthur St, SRVS Colony, Arul Murugan Nagar Extension, Keelkattalai",
            "addressLocality": "Chennai",
            "addressRegion": "Tamil Nadu",
            "postalCode": "600117",
            "addressCountry": "IN",
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "12.9563",
            "longitude": "80.1963",
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "10:00",
              "closes": "21:00",
            },
          ],
          "image": "https://redradiance.in/images/logo.png",
          "currenciesAccepted": "INR",
          "paymentAccepted": "Cash, UPI",
          "areaServed": [
            { "@type": "City", "name": "Chennai" },
            { "@type": "Neighborhood", "name": "Keelkattalai" },
            { "@type": "Neighborhood", "name": "Medavakkam" },
            { "@type": "Neighborhood", "name": "Velachery" },
            { "@type": "Neighborhood", "name": "Pallikaranai" },
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Ladies Beauty Services",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bridal Makeup" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hair Coloring" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hair Spa" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Haircut" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Facial" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cleanup" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "D-Tan" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Waxing" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Threading" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pedicure" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Manicure" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Skin Brightening" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Saree Draping" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Party Makeup" } },
            ],
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-L19YHE9RWH" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-L19YHE9RWH');`,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
        <script src="https://www.noupe.com/embed/019e50b102a37b74aeb60fdcff4ec67ed1e4.js" />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
