/**Contains broad types used to represent a component. Component-specific types will be defined with specialized component-classes. */
export enum ComponentType {
  /**Represents the land-area within which other properties, like buildings, are located. */
  PROPERTY = 'property',
  /**Type used for any type of building, like a house, appartment building, garage, or play-house. */
  BUILDING = 'building',
  /**Used to represent individual living areas inside buildings. */
  APPARTMENT = 'appartment',
  /**Used to represent the main machinery responsible for heat generation. */
  HEATING_PROVIDER = 'heating_provider',
  /**Used to represent a component distributing heat into an interior. */
  HEATING_DISTRIBUTOR = 'heating_distributor',
  THERMOSTAT = 'thermostat',
  /**Used to represent toilets. */
  TOILET = 'toilet',
  /**Used to represent sinks. */
  SINK = 'sink',
  /**Used to represent the roof of a building. */
  ROOF = 'roof',
  /**Used to represent any wall of a building; exterior or interior. */
  WALL = 'wall',
  /**Used to represent the floor of a room. */
  FLOOR = 'floor',
  /**Used to represent the ceiling of a room. */
  CEILING = 'ceiling',
  /**Used to represent wires. */
  WIRE = 'wire',
  /**Used to represent pipes. */
  PIPE = 'pipe',
  /**Used to represent electrical outlets. */
  OUTLET = 'outlet',
  /**Used to represent light-fixtures. */
  FIXTURE = 'fixture',
  /**Used to represent locks. */
  LOCK = 'lock',
  /**Used to represent doors. */
  DOOR = 'door',
  WINDOW = 'window',
  WALLPAPER = 'wallpaper',
  PAINT = 'paint',
  ROOM = 'room',
  MATERIAL = 'material',
  STOVE = 'stove',
  SAUNA = 'sauna',
  HALLWAY = 'hallway',
  DRAINAGE_DITCH = 'drainage_ditch',
}
