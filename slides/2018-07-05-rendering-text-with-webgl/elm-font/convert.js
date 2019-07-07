#!/usr/bin/env node

const name = 'Iverni';
const opentype = require('opentype.js');
const fs = require('fs');

const font = opentype.loadSync(`${name}.otf`);
const glyphs = [];
for (let i = 0; i < font.glyphs.length; i++) {
  const glyph = font.glyphs.get(i);
  const { leftSideBearing } = glyph.getMetrics();
  const path = glyph.path.toPathData();
  glyphs.push({
    path,
    advanceWidth: glyph.advanceWidth,
    leftSideBearing
  });
}

function getLookupTables(table) {
  const fontTable = font.tables[table.tableName];
  return {
    features: table
      .getLangSysTable() // only support the default script and language
      .featureIndexes
      .map((i) => fontTable.features[i])
      .map(({ tag, feature }) => ({
        tag,
        lookupIndices: feature.lookupListIndexes
      })),
    lookups: fontTable.lookups.map(({ lookupType, subtables }) => ({
      lookupType,
      subtables
    })) // not supporting lookupFlag
  };
}

const fontData = JSON.stringify({
  cmap: font.tables.cmap.glyphIndexMap,
  glyphs,
  ascender: font.ascender,
  descender: font.descender,
  xHeight: font.tables.os2.sxHeight,
  capHeight: font.tables.os2.sCapHeight,
  unitsPerEm: font.unitsPerEm,
  gsub: getLookupTables(font.substitution),
  gpos: getLookupTables(font.position),
  ligatures: font.substitution.getLigatures('liga')
});

const result =
`module Iverni exposing (font)

import Font.Font as Font exposing (Font)
import Json.Decode as Decoder


font : Font
font =
    """
${fontData}
"""
    |> Decoder.decodeString Font.decode
    |> Result.withDefault Font.empty
`;

fs.writeFile(`${name}.elm`, result, () => {
  console.log(`${name}.otf -> ${name}.elm`);
});
