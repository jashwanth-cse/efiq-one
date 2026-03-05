import { redirect } from "next/navigation";

/**
 * Root page — redirects to the product chooser.
 */
export default function HomePage() {
  redirect("/choose-product");
}
