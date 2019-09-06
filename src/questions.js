export default [
  {
    title: 'Travel',
    question: 'How are you getting to work today?',
    answers: [
      {
        value: 'car',
        label: 'By Vehicle',
        result: 'bad',
        impactExplanation: `While the amount of CO2 emissions per passenger
          generated by driving a car depends on several variables like the fuel
          type, number of passengers and travel distance, it is to this date
          one of the most greenhouse gas producing ways of transport.

          Rising CO2 emissions result in higher global temperatures, with the
          Arctic region being especially sensitive, as temperature increases at
          a rate of almost twice as much as the global average.

          This results in ocean warming, melting glaciers and loss of sea ice,
          the preferred habitat of the polar bear. If global warming continues
          to increase, polar bears could even go extinct due to starvation and
          loss of habitat.
        `,
        questions: [
          {
            id: 'co2',
            question: 'How far did you travel?',
            answers: [
              {
                value: 1.5,
                label: '< 10km'
              },
              {
                value: 3,
                label: '< 20km'
              },
              {
                value: 7.5,
                label: '< 50km'
              },
              {
                value: 15,
                label: '< 100km'
              },
              {
                value: 30,
                label: '> 100km'
              }
            ]
          }
        ]
      },
      {
        value: 'mandraulic',
        label: 'By Bicycle/Walking',
        result: 'good',
        impactExplanation: `While walking or riding your bicycle to
          work/school/university can sometimes be a challenge depending on the
          weather and season, doing so doesn’t create any greenhouse emissions
          and is therefore the best way to decrease your impact on rising CO2
          levels and a more stable climate for the Arctic region.

          Lower atmospheric CO2 levels result in lower atmospheric and sea
          temperatures and ultimately more sea ice extent.

          Choosing carbon-neutral ways of transport is therefor the best way to
          save the polar bear population.
        `
      },
      {
        value: 'public',
        label: 'By Public Transport',
        result: 'neutral',
        impactExplanation: `Both trains and buses have longer life spans than
          cars, which is one of the reasons why they are found to have a lower
          carbon footprint.

          Another factor is that they can carry more people and therefore
          account for less emissions per passenger, while the average number
          of persons per car lies between 1 and 2. While choosing the bus or
          train for transportation still relies on the use of fossil fuels,
          they both are the least carbon emitting road vehicle per passenger
          and reduces the extent of global warming and ice melting.
        `
      }
    ]
  }
]

