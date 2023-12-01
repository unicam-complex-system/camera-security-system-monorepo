export const theme = {
  colors: {
    primaryColor: "#112236",
    secondaryColor: "#588D9F",
    white: "#FFFFFF",
    black: "#000000",
  },
};

export const antTheme = {
  token: {
    colorPrimary: theme.colors.secondaryColor,
  },
  components: {
    Menu: {
      colorBgContainer: theme.colors.primaryColor,
      colorPrimary: theme.colors.white,
      itemColor: theme.colors.white,
      itemSelectedBg: theme.colors.secondaryColor,
      itemHoverBg: theme.colors.secondaryColor,
      itemHoverColor: theme.colors.white,
      itemActiveBg: theme.colors.secondaryColor,
    },
  },
};
