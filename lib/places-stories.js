// lib/places-stories.js
// Add this file to your project at: lib/places-stories.js

export const placesStories = [
  {
    id: "betla-national-park",
    name: "Betla National Park",
    story:
      "Nestled in the Palamu district, Betla National Park is one of the first national parks in India to have Project Tiger. Ancient forts built by the Chero dynasty stand silently amidst the forest, watching over elephants, tigers, and leopards that roam freely. Legend says that the ruins of Palamu Fort echo with the footsteps of Mughal soldiers who once marched through these very jungles. As dusk falls, the forests come alive with the sounds of nature — a symphony unchanged for thousands of years.",
  },
  {
    id: "hundru-falls",
    name: "Hundru Falls",
    story:
      "Hundru Falls is born where the Subarnarekha River takes a mighty leap of 98 metres off the Chota Nagpur Plateau. Local tribes have long believed that the mist rising from the falls carries the blessings of the river goddess. Young lovers from nearby villages once carved their names into the rocks beside the falls, believing the eternal flow of water would keep their bond strong. Today, surrounded by rocky terrain and lush greenery, Hundru remains one of Jharkhand's most magnificent natural wonders.",
  },
  {
    id: "dassam-falls",
    name: "Dassam Falls",
    story:
      "Where the Kanchi River descends 44 metres in a glorious cascade, Dassam Falls has been a sacred site for the Munda tribes for centuries. The name itself is derived from the local dialect, meaning the tenth waterfall. Tribal folklore holds that a brave warrior once leapt across the falls to save his village from a raging flood, and the gods, moved by his courage, blessed the waters forever. Even today, during the harvest festival of Sarhul, locals offer flowers to these sacred falls.",
  },
  {
    id: "jagannath-temple-ranchi",
    name: "Jagannath Temple, Ranchi",
    story:
      "Perched atop a rocky hill in the heart of Ranchi, the Jagannath Temple is modelled after the grand Puri temple in Odisha. Built in 1691 by Thakur Ani Nath Shahdeo, the temple has stood as a symbol of faith and devotion for over three centuries. Every year during the Rath Yatra, thousands of devotees pull the grand chariot of Lord Jagannath through the streets below, their voices joining in song and prayer. From the hilltop, you can see the city of Ranchi spread out like a painting beneath a wide sky.",
  },
  {
    id: "panchghagh-falls",
    name: "Panchghagh Falls",
    story:
      "True to its name, Panchghagh — meaning five streams — is a waterfall that divides into five distinct channels before tumbling down a rocky cliff. Surrounded by sal and mahua forests, it is a hidden gem known mostly to the Kharia tribe who have lived in these forests for generations. Tribal elders say that each stream represents one of the five elements — earth, water, fire, air, and sky — and bathing in the combined waters is believed to cleanse the soul. The falls are at their most dramatic during the monsoon, when the five streams merge into one thunderous roar.",
  },
  {
    id: "parasnath-hill",
    name: "Parasnath Hill",
    story:
      "Rising to 1,350 metres, Parasnath Hill is the highest peak in Jharkhand and one of the most sacred pilgrimage sites in Jainism. It is believed that 20 of the 24 Jain Tirthankaras, including Paraswanath, attained nirvana on this holy hill. The 27-kilometre trek through dense forests is itself a spiritual journey — as pilgrims climb, the air grows cooler and quieter, and the world below fades away. Magnificent Jain temples with shimmering white spires crown the hilltop, their bells chiming softly in the mountain breeze, a sound that has greeted pilgrims for over a thousand years.",
  },
  {
    id: "deori-temple",
    name: "Deori Temple",
    story:
      "On the banks of the Subarnarekha River stands the ancient Deori Temple, dedicated to Goddess Durga. The temple is believed to be more than 400 years old, and villagers say that the goddess herself chose this spot, appearing in the dreams of a local chieftain and guiding him to the banks of the river. During Navratri, thousands of oil lamps are lit along the riverbank, their reflections dancing in the water and turning the night into a river of light. Fishermen still pray here before setting out each morning, asking the goddess to bless their nets.",
  },
  {
    id: "hazaribagh-wildlife-sanctuary",
    name: "Hazaribagh Wildlife Sanctuary",
    story:
      "The name Hazaribagh means 'a thousand gardens', and this wildlife sanctuary lives up to its name with its lush, varied landscape of hills, valleys, and dense forests. Home to leopards, sambar deer, and sloth bears, the sanctuary was once part of the hunting grounds of the Maharaja of Ramgarh. But today it is a place of quiet wonder — where jeeps carrying wide-eyed visitors wind through misty trails at dawn, and if you are lucky, a leopard's golden eyes might catch your headlights from the shadows before vanishing silently into the night.",
  },
];

/**
 * Get story by place ID
 * @param {string} id
 * @returns {object|undefined}
 */
export function getStoryById(id) {
  return placesStories.find((place) => place.id === id);
}

/**
 * Get story by place name (case-insensitive partial match)
 * @param {string} name
 * @returns {object|undefined}
 */
export function getStoryByName(name) {
  return placesStories.find((place) =>
    place.name.toLowerCase().includes(name.toLowerCase())
  );
}
