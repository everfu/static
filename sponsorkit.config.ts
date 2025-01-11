import { BadgePreset, defineConfig, tierPresets } from 'sponsorkit'
import fs from 'fs/promises'

const past: BadgePreset = {
  avatar: {
    size: 20,
  },
  boxWidth: 22,
  boxHeight: 22,
  container: {
    sidePadding: 35,
  },
}

export default defineConfig({
  tiers: [
    {
      title: 'Past Sponsors',
      monthlyDollars: -1,
      preset: past,
    },
    {
      title: 'Backers',
      preset: tierPresets.small,
    },
    {
      title: 'Sponsors',
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
      title: 'Silver Sponsors',
      monthlyDollars: 50,
      preset: tierPresets.medium,
    },
    {
      title: 'Gold Sponsors',
      monthlyDollars: 100,
      preset: tierPresets.large,
    },
    {
      title: 'Platinum Sponsors',
      monthlyDollars: 500,
      preset: tierPresets.xl,
    },
  ],

  sponsorsAutoMerge: true,

  mergeSponsors: [
    [
      { login: 'patak-dev', provider: 'github' },
      { login: 'patak', provider: 'opencollective' },
    ],
    [
      { login: 'serkodev', provider: 'github' },
      { login: 'serko', provider: 'opencollective' },
    ],
    [
      { login: 'WebWorkerTech', provider: 'github' },
      { login: 'web-worker-podcast', provider: 'opencollective' },
    ],
    [
      { login: 'kissu', provider: 'github' },
      { login: 'kissu', provider: 'opencollective' },
    ],
  ],

  outputDir: '.',
  formats: ['svg', 'png'],

  renders: [
    {
      name: 'sponsors',
      width: 800
    },
    {
      name: 'sponsors.wide',
      width: 1800
    },
    {
      name: 'sponsors.part1',
      width: 800,
      filter: (sponsor) => sponsor.monthlyDollars >= 9.9
    },
    {
      name: 'sponsors.part2',
      width: 800,
      filter: (sponsor) => sponsor.monthlyDollars < 9.9 && sponsor.monthlyDollars >= 0
    },
    {
      name: 'sponsors.past',
      width: 800,
      filter: (sponsor) => sponsor.monthlyDollars < 0
    },
    {
      name: 'sponsors.circles',
      width: 1000,
      includePastSponsors: true,
      renderer: 'circles',
      circles: {
        radiusPast: 3
      }
    },
  ],
  async onSponsorsReady(sponsors) {
    await fs.writeFile(
      'sponsors.json',
      JSON.stringify(
        sponsors
          .filter((i) => i.privacyLevel !== 'PRIVATE')
          .map((i) => {
            return {
              name: i.sponsor.name,
              login: i.sponsor.login,
              avatar: i.sponsor.avatarUrl,
              amount: i.monthlyDollars,
              link: i.sponsor.linkUrl || i.sponsor.websiteUrl,
              org: i.sponsor.type === 'Organization'
            }
          })
          .sort((a, b) => b.amount - a.amount),
        null,
        2
      )
    )
  },
})