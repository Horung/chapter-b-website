import type { NextConfig } from 'next';

const repository = process.env.GITHUB_REPOSITORY?.split('/') ?? [];
const [owner, repositoryName] = repository;
const isGithubPagesBuild = process.env.GITHUB_ACTIONS === 'true';
const isUserOrOrganizationSite = repositoryName === `${owner}.github.io`;
const basePath = isGithubPagesBuild && repositoryName && !isUserOrOrganizationSite
  ? `/${repositoryName}`
  : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
