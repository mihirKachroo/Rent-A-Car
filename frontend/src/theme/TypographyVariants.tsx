import React from 'react';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    heading1: React.CSSProperties;
    heading2: React.CSSProperties;
  }

  // Allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    heading1?: React.CSSProperties;
    heading2?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    heading1: true;
    heading2: true;
  }
}
