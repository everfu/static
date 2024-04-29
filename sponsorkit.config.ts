import { defineConfig, presets } from 'sponsorkit'

export default defineConfig({
  includePrivate: true,
  tiers: [
    {
      title: 'Past Sponsors',
      monthlyDollars: -1,
      preset: presets.xs,
    },
    {
      title: 'Backers',
    },
    {
      title: 'Sponsors',
      monthlyDollars: 10,
      preset: presets.medium,
      composeAfter: (composer, _tierSponsors, _config) => {
        composer.addSpan(10)
      },
    },
    {
      title: 'Silver Sponsors',
      monthlyDollars: 50,
      preset: presets.medium,
    },
    {
      title: 'Gold Sponsors',
      monthlyDollars: 100,
      preset: presets.large,
    },
    {
      title: 'Platinum Sponsors',
      monthlyDollars: 500,
      preset: presets.xl,
    }
  ],
})