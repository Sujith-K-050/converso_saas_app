"use client";

import { subjects } from "@/constants";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SubjectFilter = () => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("subject") || "";

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "subject",
          value: searchQuery,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathName === "/companions") {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["subject"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 1000);
  }, [searchQuery, router, searchParams, pathName]);

  return (
    <div className="relative border border-black rounded-lg items-center flex pag-2 px-2 py-1 h-fit">
      <input
        placeholder="Search Subject..."
        list="subjects"
        className="outline-none"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <datalist id="subjects">
        {subjects.map((subject) => (
          <option key={subject} value={subject} />
        ))}
      </datalist>
    </div>
  );
};

export default SubjectFilter;
