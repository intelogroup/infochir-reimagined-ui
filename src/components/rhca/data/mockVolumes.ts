import { volumes2024 } from "./years/2024";
import { volumes2023 } from "./years/2023";
import { volumes2022 } from "./years/2022";
import { volumes2021 } from "./years/2021";
import type { RhcaVolume } from "../types";

export const mockVolumes: RhcaVolume[] = [
  ...volumes2024,
  ...volumes2023,
  ...volumes2022,
  ...volumes2021
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());