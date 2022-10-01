export const tabsInitState = {
  addMaterial: false,
  listMaterial: false,
  tecnicoMaterial: false,
};

export const tabsReducer = (currentState, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...action.payload,
        addMaterial: true,
      };
    case "LIST":
      return {
        ...action.payload,
        listMaterial: true,
      };
    case "TECNICO":
      return {
        ...action.payload,
        tecnicoMaterial: true,
      };

    default:
      return {
        ...currentState,
      };
  }
};
