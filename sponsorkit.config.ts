import { BadgePreset, defineConfig, tierPresets } from "sponsorkit";
import fs from "fs/promises";
import { createHash } from "crypto";

const past: BadgePreset = {
  avatar: {
    size: 20,
  },
  boxWidth: 22,
  boxHeight: 22,
  container: {
    sidePadding: 35,
  },
};

export default defineConfig({
  tiers: [
    {
      title: "Past Sponsors",
      monthlyDollars: -1,
      preset: past,
    },
    {
      title: "Backers",
      preset: tierPresets.small,
    },
    {
      title: "Sponsors",
      monthlyDollars: 10,
      preset: {
        avatar: {
          size: 42,
        },
        boxWidth: 52,
        boxHeight: 52,
        container: {
          sidePadding: 30,
        },
      },
    },
    {
      title: "Silver Sponsors",
      monthlyDollars: 50,
      preset: tierPresets.medium,
    },
    {
      title: "Gold Sponsors",
      monthlyDollars: 100,
      preset: tierPresets.large,
    },
    {
      title: "Platinum Sponsors",
      monthlyDollars: 500,
      preset: tierPresets.xl,
    },
  ],

  sponsorsAutoMerge: true,

  mergeSponsors: [],

  outputDir: ".",
  formats: ["svg", "png"],

  renders: [
    {
      name: "sponsors",
      width: 800,
    },
  ],
  async onSponsorsReady(sponsors) {
    await fs.writeFile(
      "sponsors.json",
      JSON.stringify(
        sponsors
          .filter((i) => i.privacyLevel !== "PRIVATE")
          .map((i) => {
            return {
              provider: i.provider,
              name: i.sponsor.name,
              login: i.sponsor.login,
              avatar: i.sponsor.avatarUrl,
              amount: i.raw.all_sum_amount,
              link: i.sponsor.linkUrl || i.sponsor.websiteUrl,
              org: i.sponsor.type === "Organization",
            };
          })
          .sort((a, b) => b.amount - a.amount),
        null,
        2
      )
    );
  },
});
