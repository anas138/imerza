/*
 * Copyright (c) Imerza, LLC 2022. All rights reserved
 */

import { SimpleGrid } from "@mantine/core";

const TileGrid = ({ children }) => {
  return (
    <SimpleGrid
      breakpoints={[
        { minWidth: 400, cols: 2 },
        { minWidth: 700, cols: 3 },
        { minWidth: 900, cols: 4 },
        { minWidth: 1150, cols: 5 },
        { minWidth: 1275, cols: 6 },
        { minWidth: 1600, cols: 7 },
      ]}
    >
      {children}
    </SimpleGrid>
  );
};
export default TileGrid;
