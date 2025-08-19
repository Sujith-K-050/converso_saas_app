import React from "react";
import CompanionCard from "@/components/CompanionCard";
import CTA from "@/components/CTA";
import CompanionsList from "@/components/CompanionsList";
import { recentSessions } from "@/constants";
import {
  getAllCompanions,
  getRecentSessions,
} from "@/lib/actions/companion.action";
import { getSubjectColor } from "@/lib/utils";

const Page = async () => {
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessionsCompanions = await getRecentSessions(10);

  return (
    <main>
      <h1 className="text-2xl ">Popular Companions</h1>
      <section className="home-section  ">
        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>
      <section className="flex flex-row items-between max-sm:flex-col">
        <section className="home-section">
          <CompanionsList
            title="Recently completed sessions"
            companions={recentSessionsCompanions}
            classNames="w-2/3 max-lg:w-full"
          />
          <CTA />
        </section>
      </section>
    </main>
  );
};

export default Page;
