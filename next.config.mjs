import path from "path";
import { fileURLToPath } from "url";

const rootDirectory = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: rootDirectory,
};

export default nextConfig;
