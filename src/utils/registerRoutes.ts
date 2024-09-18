import { logger } from "../logger/log";
export async function registerRoute(path: string): Promise<any> {
    try {
      const route = await import(path);
      if (route && route.default && typeof route.default === 'function') {
        return route.default;
      } else {
        throw new Error(`File with path ${path} does not export a default function`);
      }
    } catch (error: unknown) {
      logger.error(`Error registering route: ${(error as unknown as any)?.message}`);
      return null;
    }
}