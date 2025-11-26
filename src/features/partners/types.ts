import type { Partner as PrismaPartner } from "@prisma/client";

export type Partner = PrismaPartner;
export type PartnerInput = Omit<Partner, "id">;
