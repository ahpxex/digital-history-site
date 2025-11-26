"use client";

import { Card, CardBody, Image, Link } from "@heroui/react";

interface Partner {
  id: number | string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
}

export function PartnersGrid({ partners }: { partners: Partner[] }) {
    if (!partners?.length) {
        return (
          <div className="w-full text-center py-20 text-default-400">
            暂无合作机构。
          </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
            {partners.map((partner) => (
                <Link 
                    key={partner.id} 
                    href={partner.websiteUrl} 
                    isExternal 
                    className="block w-full h-full"
                >
                    <Card shadow="sm" className="h-32 md:h-40 hover:shadow-md transition-all hover:-translate-y-1 border border-default-100 bg-white dark:bg-default-50">
                        <CardBody className="p-4 flex items-center justify-center overflow-hidden">
                            {partner.logoUrl ? (
                                <div className="relative w-full h-full flex items-center justify-center">
                                  <Image 
                                      src={partner.logoUrl} 
                                      alt={partner.name}
                                      classNames={{ img: "max-h-20 md:max-h-24 w-auto object-contain" }}
                                  />
                                </div>
                            ) : (
                                <span className="text-center font-semibold text-default-500 line-clamp-2">
                                    {partner.name}
                                </span>
                            )}
                        </CardBody>
                    </Card>
                </Link>
            ))}
        </div>
    )
}
