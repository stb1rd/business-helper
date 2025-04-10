const COLORS = [
  // 'Красные тона',
  'IndianRed',
  'LightCoral',
  'Salmon',
  'DarkSalmon',
  'LightSalmon',
  'Crimson',
  'Red',
  'FireBrick',
  'DarkRed',

  // 'Розовые тона',
  'Pink',
  'LightPink',
  'HotPink',
  'DeepPink',
  'MediumVioletRed',
  'PaleVioletRed',

  // 'Оранжевые тона',
  'LightSalmon',
  'Coral',
  'Tomato',
  'OrangeRed',
  'DarkOrange',
  'Orange',

  // 'Жёлтые тона',
  // 'Gold',
  // 'Yellow',
  // 'LightYellow',
  // 'LemonChiffon',
  // 'LightGoldenrodYellow',
  // 'PapayaWhip',
  // 'Moccasin',
  // 'PeachPuff',
  // 'PaleGoldenrod',
  // 'Khaki',
  // 'DarkKhaki',

  // 'Фиолетовые тона',
  'Lavender',
  'Thistle',
  'Plum',
  'Violet',
  'Orchid',
  'Fuchsia',
  'Magenta',
  'MediumOrchid',
  'MediumPurple',
  'BlueViolet',
  'DarkViolet',
  'DarkOrchid',
  'DarkMagenta',
  'Purple',
  'Indigo',
  'SlateBlue',
  'DarkSlateBlue',

  // 'Коричневые тона',
  'Cornsilk',
  'BlanchedAlmond',
  'Bisque',
  'NavajoWhite',
  'Wheat',
  'BurlyWood',
  'Tan',
  'RosyBrown',
  'SandyBrown',
  'Goldenrod',
  'DarkGoldenRod',
  'Peru',
  'Chocolate',
  'SaddleBrown',
  'Sienna',
  'Brown',
  'Maroon',

  // 'Основные цвета',
  // 'Black',
  // 'Gray',
  // 'Silver',
  // 'White',
  // 'Fuchsia',
  // 'Purple',
  // 'Red',
  // 'Maroon',
  // 'Yellow',
  // 'Olive',
  // 'Lime',
  // 'Green  ',
  // 'Aqua',
  // 'Teal',
  // 'Blue',
  // 'Navy',

  // 'Зелёные тона',
  'GreenYellow',
  'Chartreuse',
  'LawnGreen',
  'Lime',
  'LimeGreen',
  'PaleGreen',
  'LightGreen',
  'MediumSpringGreen',
  'SpringGreen',
  'MediumSeaGreen',
  'SeaGreen',
  'ForestGreen',
  'Green',
  'DarkGreen',
  'YellowGreen',
  'OliveDrab',
  'Olive',
  'DarkOliveGreen',
  'MediumAquamarine',
  'DarkSeaGreen',
  'LightSeaGreen',
  'DarkCyan',
  'Teal',

  // 'Синие тона',
  'Aqua',
  'Cyan',
  'LightCyan',
  'PaleTurquoise',
  'Aquamarine',
  'Turquoise',
  'MediumTurquoise',
  'DarkTurquoise',
  'CadetBlue',
  'SteelBlue',
  'LightSteelBlue',
  'PowderBlue',
  'LightBlue',
  'SkyBlue',
  'LightSkyBlue',
  'DeepSkyBlue',
  'DodgerBlue',
  'CornflowerBlue',
  'MediumSlateBlue',
  'RoyalBlue',
  'Blue',
  'MediumBlue',
  'DarkBlue',
  'Navy',
  'MidnightBlue',

  // 'Белые тона',
  // 'White',
  // 'Snow',
  // 'Honeydew',
  // 'MintCream',
  // 'Azure',
  // 'AliceBlue',
  // 'GhostWhite',
  // 'WhiteSmoke',
  // 'Seashell',
  // 'Beige',
  // 'OldLace',
  // 'FloralWhite',
  // 'Ivory',
  // 'AntiqueWhite',
  // 'Linen',
  // 'LavenderBlush',
  // 'MistyRose',

  // 'Серые тона',
  // 'Gainsboro',
  // 'LightGrey',
  // 'LightGray',
  // 'Silver',
  // 'DarkGray',
  // 'DarkGrey',
  // 'Gray',
  // 'Grey',
  // 'DimGray',
  // 'DimGrey',
  // 'LightSlateGray',
  // 'LightSlateGrey',
  // 'SlateGray',
  // 'SlateGrey',
  // 'DarkSlateGray',
  // 'DarkSlateGrey',
  // 'Black',
];

const STEP = 23;

export const getColor = (targetIndex?: number) => {
  let colorIndex = Math.floor(Math.random() * COLORS.length);
  if (targetIndex) {
    colorIndex = (targetIndex * STEP) % COLORS.length;
  }

  return COLORS[colorIndex];
};
