import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  // By default only the .mdx extension is supported
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig); 