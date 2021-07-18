import { PlatformFeature } from '../components/MainDisplay/Platform';
import { StationFeatureType } from '../constants/station';
import { StationInfo } from '../typings/typings';
import { getFlippedDoorIndex } from '../utils/utils';
import { groupedByLine } from './grouped';

/* eslint-disable max-lines */
export interface Station {
  code: string;
  name: string;
  line: string;
  info?: StationInfo;
}

export enum Line {
  NorthSouth = 'North South Line'
}

export interface LineInfo {
  numCarraiges: number;
  numDoors: number;
  firstStation: string;
  lastStation: string;
}

export const lineInfo = (line: Line): LineInfo => {
  switch (line) {
    case Line.NorthSouth:
    default:
      return {
        numCarraiges: 6,
        numDoors: 4,
        firstStation: groupedByLine[line][0].name,
        lastStation: groupedByLine[line][groupedByLine[line].length -1].name
      };
  }
};

const doorDistance = (door: number, line: Line) => {
  const { numCarraiges, numDoors } = lineInfo(line);
  const totalNumDoors = numCarraiges * numDoors - 1;
  return parseFloat(((door-1)/totalNumDoors * 100).toFixed(1));
};

export const hashedByCode: Record<string, Station> = {
  NS1: {
    code: 'NS1',
    name: 'Jurong East',
    line: 'North South Line'
  },
  NS2: {
    code: 'NS2',
    name: 'Bukit Batok',
    line: 'North South Line'
  },
  NS3: {
    code: 'NS3',
    name: 'Bukit Gombak',
    line: 'North South Line'
  },
  NS4: {
    code: 'NS4',
    name: 'Choa Chu Kang',
    line: 'North South Line'
  },
  NS5: {
    code: 'NS5',
    name: 'Yew Tee',
    line: 'North South Line'
  },
  NS7: {
    code: 'NS7',
    name: 'Kranji',
    line: 'North South Line'
  },
  NS8: {
    code: 'NS8',
    name: 'Marsiling',
    line: 'North South Line'
  },
  NS9: {
    code: 'NS9',
    name: 'Woodlands',
    line: 'North South Line'
  },
  NS10: {
    code: 'NS10',
    name: 'Admiralty',
    line: 'North South Line'
  },
  NS11: {
    code: 'NS11',
    name: 'Sembawang',
    line: 'North South Line'
  },
  NS12: {
    code: 'NS12',
    name: 'Canberra',
    line: 'North South Line'
  },
  NS13: {
    code: 'NS13',
    name: 'Yishun',
    line: 'North South Line'
  },
  NS14: {
    code: 'NS14',
    name: 'Khatib',
    line: 'North South Line',
    info: [
      {
        type: StationFeatureType.Train,
        bestDoorIndexes: [19]
      },
      {
        type: StationFeatureType.Platform,
        platformInfo: [
          {
            distFromHead: doorDistance(6, Line.NorthSouth),
            features: [
              PlatformFeature.Stairs,
              PlatformFeature.EscalatorEntry
            ]
          },
          {
            distFromHead: doorDistance(12.5, Line.NorthSouth),
            features: [
              PlatformFeature.Elevator
            ]
          },
          {
            distFromHead: doorDistance(19, Line.NorthSouth),
            features: [
              PlatformFeature.Stairs,
              PlatformFeature.EscalatorExit
            ]
          }
        ]
      },
      {
        type: StationFeatureType.OtherTrain,
        sameDirection: false,
        bestDoorIndexes: [getFlippedDoorIndex(19, Line.NorthSouth)]
      }
    ]
  },
  NS15: {
    code: 'NS15',
    name: 'Yio Chu Kang',
    line: 'North South Line',
    info: [
      {
        type: StationFeatureType.Train,
        bestDoorIndexes: [7]
      },
      {
        type: StationFeatureType.Platform,
        platformInfo: [
          {
            distFromHead: doorDistance(5.5, Line.NorthSouth),
            features: [
              PlatformFeature.Elevator
            ]
          },
          {
            distFromHead: doorDistance(7, Line.NorthSouth),
            features: [
              PlatformFeature.EscalatorExit,
              PlatformFeature.EscalatorEntry
            ]
          },
          {
            distFromHead: doorDistance(18, Line.NorthSouth),
            features: [
              PlatformFeature.EscalatorEntry,
              PlatformFeature.Stairs
            ]
          }
        ]
      },
      {
        type: StationFeatureType.OtherTrain,
        sameDirection: false,
        bestDoorIndexes: [getFlippedDoorIndex(7, Line.NorthSouth)]
      }
    ]
  },
  NS16: {
    code: 'NS16',
    name: 'Ang Mo Kio',
    line: 'North South Line',
    info: [
      {
        type: StationFeatureType.Train,
        bestDoorIndexes: [8, 17]
      },
      {
        type: StationFeatureType.Platform,
        platformInfo: [
          {
            distFromHead: doorDistance(4, Line.NorthSouth),
            features: [
              PlatformFeature.Stairs
            ]
          },
          {
            distFromHead: doorDistance(6, Line.NorthSouth),
            features: [
              PlatformFeature.Elevator
            ]
          },
          {
            distFromHead: doorDistance(8, Line.NorthSouth),
            features: [
              PlatformFeature.EscalatorExit,
              PlatformFeature.EscalatorEntry
            ]
          },
          {
            distFromHead: doorDistance(17, Line.NorthSouth),
            features: [
              PlatformFeature.Stairs,
              PlatformFeature.EscalatorExit
            ]
          }
        ]
      },
      {
        type: StationFeatureType.SpecialTrack,
        sameDirection: null,
        message: 'To Depot'
      },
      {
        type: StationFeatureType.Platform,
        platformInfo: [
          {
            distFromHead: doorDistance(4, Line.NorthSouth),
            features: [
              PlatformFeature.Stairs
            ]
          },
          {
            distFromHead: doorDistance(6, Line.NorthSouth),
            features: [
              PlatformFeature.Elevator
            ]
          },
          {
            distFromHead: doorDistance(8, Line.NorthSouth),
            features: [
              PlatformFeature.EscalatorExit,
              // todo: uncomment
              PlatformFeature.EscalatorEntry
            ]
          },
          {
            distFromHead: doorDistance(17, Line.NorthSouth),
            features: [
              PlatformFeature.EscalatorEntry,
              PlatformFeature.Stairs
            ]
          }
        ]
      },
      {
        type: StationFeatureType.OtherTrain,
        sameDirection: false,
        bestDoorIndexes: [getFlippedDoorIndex(8, Line.NorthSouth)]
      }
    ]
  },
  NS17: {
    code: 'NS17',
    name: 'Bishan',
    line: 'North South Line'
  },
  NS18: {
    code: 'NS18',
    name: 'Braddell',
    line: 'North South Line'
  },
  NS19: {
    code: 'NS19',
    name: 'Toa Payoh',
    line: 'North South Line'
  },
  NS20: {
    code: 'NS20',
    name: 'Novena',
    line: 'North South Line'
  },
  NS21: {
    code: 'NS21',
    name: 'Newton',
    line: 'North South Line'
  },
  NS22: {
    code: 'NS22',
    name: 'Orchard',
    line: 'North South Line'
  },
  NS23: {
    code: 'NS23',
    name: 'Somerset',
    line: 'North South Line'
  },
  NS24: {
    code: 'NS24',
    name: 'Dhoby Ghaut',
    line: 'North South Line',
    info: [
      {
        type: StationFeatureType.Train,
        bestDoorIndexes: [8, 17]
      },
      {
        type: StationFeatureType.Platform,
        platformInfo: [
          {
            distFromHead: doorDistance(5, Line.NorthSouth),
            features: [
              PlatformFeature.Stairs
            ]
          },
          {
            distFromHead: doorDistance(8, Line.NorthSouth),
            features: [
              PlatformFeature.EscalatorExit,
              PlatformFeature.EscalatorEntry
            ]
          },
          {
            distFromHead: doorDistance(11, Line.NorthSouth),
            features: [
              PlatformFeature.Stairs
            ]
          },
          {
            distFromHead: doorDistance(12.5, Line.NorthSouth),
            features: [
              PlatformFeature.Elevator
            ]
          },
          {
            distFromHead: doorDistance(14, Line.NorthSouth),
            features: [
              PlatformFeature.Stairs
            ]
          },
          {
            distFromHead: doorDistance(17, Line.NorthSouth),
            features: [
              PlatformFeature.EscalatorExit,
              PlatformFeature.EscalatorEntry
            ]
          },
          {
            distFromHead: doorDistance(20, Line.NorthSouth),
            features: [
              PlatformFeature.Stairs
            ]
          }
        ]
      },
      {
        type: StationFeatureType.OtherTrain,
        sameDirection: false,
        bestDoorIndexes: [8, 17]
      }
    ]
  },
  NS25: {
    code: 'NS25',
    name: 'City Hall',
    line: 'North South Line'
  },
  NS26: {
    code: 'NS26',
    name: 'Raffles Place',
    line: 'North South Line'
  },
  NS27: {
    code: 'NS27',
    name: 'Marina Bay',
    line: 'North South Line'
  },
  NS28: {
    code: 'NS28',
    name: 'Marina South Pier',
    line: 'North South Line'
  },
  EW1: {
    code: 'EW1',
    name: 'Pasir Ris',
    line: 'East West Line'
  },
  EW2: {
    code: 'EW2',
    name: 'Tampines',
    line: 'East West Line'
  },
  EW3: {
    code: 'EW3',
    name: 'Simei',
    line: 'East West Line'
  },
  EW4: {
    code: 'EW4',
    name: 'Tanah Merah',
    line: 'East West Line'
  },
  EW5: {
    code: 'EW5',
    name: 'Bedok',
    line: 'East West Line'
  },
  EW6: {
    code: 'EW6',
    name: 'Kembangan',
    line: 'East West Line'
  },
  EW7: {
    code: 'EW7',
    name: 'Eunos',
    line: 'East West Line'
  },
  EW8: {
    code: 'EW8',
    name: 'Paya Lebar',
    line: 'East West Line'
  },
  EW9: {
    code: 'EW9',
    name: 'Aljunied',
    line: 'East West Line'
  },
  EW10: {
    code: 'EW10',
    name: 'Kallang',
    line: 'East West Line'
  },
  EW11: {
    code: 'EW11',
    name: 'Lavender',
    line: 'East West Line'
  },
  EW12: {
    code: 'EW12',
    name: 'Bugis',
    line: 'East West Line'
  },
  EW13: {
    code: 'EW13',
    name: 'City Hall',
    line: 'East West Line'
  },
  EW14: {
    code: 'EW14',
    name: 'Raffles Place',
    line: 'East West Line'
  },
  EW15: {
    code: 'EW15',
    name: 'Tanjong Pagar',
    line: 'East West Line'
  },
  EW16: {
    code: 'EW16',
    name: 'Outram Park',
    line: 'East West Line'
  },
  EW17: {
    code: 'EW17',
    name: 'Tiong Bahru',
    line: 'East West Line'
  },
  EW18: {
    code: 'EW18',
    name: 'Redhill',
    line: 'East West Line'
  },
  EW19: {
    code: 'EW19',
    name: 'Queenstown',
    line: 'East West Line'
  },
  EW20: {
    code: 'EW20',
    name: 'Commonwealth',
    line: 'East West Line'
  },
  EW21: {
    code: 'EW21',
    name: 'Buona Vista',
    line: 'East West Line'
  },
  EW22: {
    code: 'EW22',
    name: 'Dover',
    line: 'East West Line'
  },
  EW23: {
    code: 'EW23',
    name: 'Clementi',
    line: 'East West Line'
  },
  EW24: {
    code: 'EW24',
    name: 'Jurong East',
    line: 'East West Line'
  },
  EW25: {
    code: 'EW25',
    name: 'Chinese Garden',
    line: 'East West Line'
  },
  EW26: {
    code: 'EW26',
    name: 'Lakeside',
    line: 'East West Line'
  },
  EW27: {
    code: 'EW27',
    name: 'Boon Lay',
    line: 'East West Line'
  },
  EW28: {
    code: 'EW28',
    name: 'Pioneer',
    line: 'East West Line'
  },
  EW29: {
    code: 'EW29',
    name: 'Joo Koon',
    line: 'East West Line'
  },
  EW30: {
    code: 'EW30',
    name: 'Gul Circle',
    line: 'East West Line'
  },
  EW31: {
    code: 'EW31',
    name: 'Tuas Crescent',
    line: 'East West Line'
  },
  EW32: {
    code: 'EW32',
    name: 'Tuas West Road',
    line: 'East West Line'
  },
  EW33: {
    code: 'EW33',
    name: 'Tuas Link',
    line: 'East West Line'
  },
  CG1: {
    code: 'CG1',
    name: 'Expo',
    line: 'Changi Airport Branch Line'
  },
  CG2: {
    code: 'CG2',
    name: 'Changi Airport',
    line: 'Changi Airport Branch Line'
  },
  NE1: {
    code: 'NE1',
    name: 'HarbourFront',
    line: 'North East Line'
  },
  NE3: {
    code: 'NE3',
    name: 'Outram Park',
    line: 'North East Line'
  },
  NE4: {
    code: 'NE4',
    name: 'Chinatown',
    line: 'North East Line'
  },
  NE5: {
    code: 'NE5',
    name: 'Clarke Quay',
    line: 'North East Line'
  },
  NE6: {
    code: 'NE6',
    name: 'Dhoby Ghaut',
    line: 'North East Line'
  },
  NE7: {
    code: 'NE7',
    name: 'Little India',
    line: 'North East Line'
  },
  NE8: {
    code: 'NE8',
    name: 'Farrer Park',
    line: 'North East Line'
  },
  NE9: {
    code: 'NE9',
    name: 'Boon Keng',
    line: 'North East Line'
  },
  NE10: {
    code: 'NE10',
    name: 'Potong Pasir',
    line: 'North East Line'
  },
  NE11: {
    code: 'NE11',
    name: 'Woodleigh',
    line: 'North East Line'
  },
  NE12: {
    code: 'NE12',
    name: 'Serangoon',
    line: 'North East Line'
  },
  NE13: {
    code: 'NE13',
    name: 'Kovan',
    line: 'North East Line'
  },
  NE14: {
    code: 'NE14',
    name: 'Hougang',
    line: 'North East Line'
  },
  NE15: {
    code: 'NE15',
    name: 'Buangkok',
    line: 'North East Line'
  },
  NE16: {
    code: 'NE16',
    name: 'Sengkang',
    line: 'North East Line'
  },
  NE17: {
    code: 'NE17',
    name: 'Punggol',
    line: 'North East Line'
  },
  CC1: {
    code: 'CC1',
    name: 'Dhoby Ghaut',
    line: 'Circle Line'
  },
  CC2: {
    code: 'CC2',
    name: 'Bras Basah',
    line: 'Circle Line'
  },
  CC3: {
    code: 'CC3',
    name: 'Esplanade',
    line: 'Circle Line'
  },
  CC4: {
    code: 'CC4',
    name: 'Promenade',
    line: 'Circle Line'
  },
  CC5: {
    code: 'CC5',
    name: 'Nicoll Highway',
    line: 'Circle Line'
  },
  CC6: {
    code: 'CC6',
    name: 'Stadium',
    line: 'Circle Line'
  },
  CC7: {
    code: 'CC7',
    name: 'Mountbatten',
    line: 'Circle Line'
  },
  CC8: {
    code: 'CC8',
    name: 'Dakota',
    line: 'Circle Line'
  },
  CC9: {
    code: 'CC9',
    name: 'Paya Lebar',
    line: 'Circle Line'
  },
  CC10: {
    code: 'CC10',
    name: 'MacPherson',
    line: 'Circle Line'
  },
  CC11: {
    code: 'CC11',
    name: 'Tai Seng',
    line: 'Circle Line'
  },
  CC12: {
    code: 'CC12',
    name: 'Bartley',
    line: 'Circle Line'
  },
  CC13: {
    code: 'CC13',
    name: 'Serangoon',
    line: 'Circle Line'
  },
  CC14: {
    code: 'CC14',
    name: 'Lorong Chuan',
    line: 'Circle Line'
  },
  CC15: {
    code: 'CC15',
    name: 'Bishan',
    line: 'Circle Line'
  },
  CC16: {
    code: 'CC16',
    name: 'Marymount',
    line: 'Circle Line'
  },
  CC17: {
    code: 'CC17',
    name: 'Caldecott',
    line: 'Circle Line'
  },
  CC19: {
    code: 'CC19',
    name: 'Botanic Gardens',
    line: 'Circle Line'
  },
  CC20: {
    code: 'CC20',
    name: 'Farrer Road',
    line: 'Circle Line'
  },
  CC21: {
    code: 'CC21',
    name: 'Holland Village',
    line: 'Circle Line'
  },
  CC22: {
    code: 'CC22',
    name: 'Buona Vista',
    line: 'Circle Line'
  },
  CC23: {
    code: 'CC23',
    name: 'one-north',
    line: 'Circle Line'
  },
  CC24: {
    code: 'CC24',
    name: 'Kent Ridge',
    line: 'Circle Line'
  },
  CC25: {
    code: 'CC25',
    name: 'Haw Par Villa',
    line: 'Circle Line'
  },
  CC26: {
    code: 'CC26',
    name: 'Pasir Panjang',
    line: 'Circle Line'
  },
  CC27: {
    code: 'CC27',
    name: 'Labrador Park',
    line: 'Circle Line'
  },
  CC28: {
    code: 'CC28',
    name: 'Telok Blangah',
    line: 'Circle Line'
  },
  CC29: {
    code: 'CC29',
    name: 'HarbourFront',
    line: 'Circle Line'
  },
  CE1: {
    code: 'CE1',
    name: 'Bayfront',
    line: 'Circle Line Extension'
  },
  CE2: {
    code: 'CE2',
    name: 'Marina Bay',
    line: 'Circle Line Extension'
  },
  DT1: {
    code: 'DT1',
    name: 'Bukit Panjang',
    line: 'Downtown Line'
  },
  DT2: {
    code: 'DT2',
    name: 'Cashew',
    line: 'Downtown Line'
  },
  DT3: {
    code: 'DT3',
    name: 'Hillview',
    line: 'Downtown Line'
  },
  DT5: {
    code: 'DT5',
    name: 'Beauty World',
    line: 'Downtown Line'
  },
  DT6: {
    code: 'DT6',
    name: 'King Albert Park',
    line: 'Downtown Line'
  },
  DT7: {
    code: 'DT7',
    name: 'Sixth Avenue',
    line: 'Downtown Line'
  },
  DT8: {
    code: 'DT8',
    name: 'Tan Kah Kee',
    line: 'Downtown Line'
  },
  DT9: {
    code: 'DT9',
    name: 'Botanic Gardens',
    line: 'Downtown Line'
  },
  DT10: {
    code: 'DT10',
    name: 'Stevens',
    line: 'Downtown Line'
  },
  DT11: {
    code: 'DT11',
    name: 'Newton',
    line: 'Downtown Line'
  },
  DT12: {
    code: 'DT12',
    name: 'Little India',
    line: 'Downtown Line'
  },
  DT13: {
    code: 'DT13',
    name: 'Rochor',
    line: 'Downtown Line'
  },
  DT14: {
    code: 'DT14',
    name: 'Bugis',
    line: 'Downtown Line'
  },
  DT15: {
    code: 'DT15',
    name: 'Promenade',
    line: 'Downtown Line'
  },
  DT16: {
    code: 'DT16',
    name: 'Bayfront',
    line: 'Downtown Line'
  },
  DT17: {
    code: 'DT17',
    name: 'Downtown',
    line: 'Downtown Line'
  },
  DT18: {
    code: 'DT18',
    name: 'Telok Ayer',
    line: 'Downtown Line'
  },
  DT19: {
    code: 'DT19',
    name: 'Chinatown',
    line: 'Downtown Line'
  },
  DT20: {
    code: 'DT20',
    name: 'Fort Canning',
    line: 'Downtown Line'
  },
  DT21: {
    code: 'DT21',
    name: 'Bencoolen',
    line: 'Downtown Line'
  },
  DT22: {
    code: 'DT22',
    name: 'Jalan Besar',
    line: 'Downtown Line'
  },
  DT23: {
    code: 'DT23',
    name: 'Bendemeer',
    line: 'Downtown Line'
  },
  DT24: {
    code: 'DT24',
    name: 'Geylang Bahru',
    line: 'Downtown Line'
  },
  DT25: {
    code: 'DT25',
    name: 'Mattar',
    line: 'Downtown Line'
  },
  DT26: {
    code: 'DT26',
    name: 'MacPherson',
    line: 'Downtown Line'
  },
  DT27: {
    code: 'DT27',
    name: 'Ubi',
    line: 'Downtown Line'
  },
  DT28: {
    code: 'DT28',
    name: 'Kaki Bukit',
    line: 'Downtown Line'
  },
  DT29: {
    code: 'DT29',
    name: 'Bedok North',
    line: 'Downtown Line'
  },
  DT30: {
    code: 'DT30',
    name: 'Bedok Reservoir',
    line: 'Downtown Line'
  },
  DT31: {
    code: 'DT31',
    name: 'Tampines West',
    line: 'Downtown Line'
  },
  DT32: {
    code: 'DT32',
    name: 'Tampines',
    line: 'Downtown Line'
  },
  DT33: {
    code: 'DT33',
    name: 'Tampines East',
    line: 'Downtown Line'
  },
  DT34: {
    code: 'DT34',
    name: 'Upper Changi',
    line: 'Downtown Line'
  },
  DT35: {
    code: 'DT35',
    name: 'Expo',
    line: 'Downtown Line'
  },
  BP1: {
    code: 'BP1',
    name: 'Choa Chu Kang',
    line: 'Bukit Panjang LRT'
  },
  BP2: {
    code: 'BP2',
    name: 'South View',
    line: 'Bukit Panjang LRT'
  },
  BP3: {
    code: 'BP3',
    name: 'Keat Hong',
    line: 'Bukit Panjang LRT'
  },
  BP4: {
    code: 'BP4',
    name: 'Teck Whye',
    line: 'Bukit Panjang LRT'
  },
  BP5: {
    code: 'BP5',
    name: 'Phoenix',
    line: 'Bukit Panjang LRT'
  },
  BP6: {
    code: 'BP6',
    name: 'Bukit Panjang',
    line: 'Bukit Panjang LRT'
  },
  BP7: {
    code: 'BP7',
    name: 'Petir',
    line: 'Bukit Panjang LRT'
  },
  BP8: {
    code: 'BP8',
    name: 'Pending',
    line: 'Bukit Panjang LRT'
  },
  BP9: {
    code: 'BP9',
    name: 'Bangkit',
    line: 'Bukit Panjang LRT'
  },
  BP10: {
    code: 'BP10',
    name: 'Fajar',
    line: 'Bukit Panjang LRT'
  },
  BP11: {
    code: 'BP11',
    name: 'Segar',
    line: 'Bukit Panjang LRT'
  },
  BP12: {
    code: 'BP12',
    name: 'Jelapang',
    line: 'Bukit Panjang LRT'
  },
  BP13: {
    code: 'BP13',
    name: 'Senja',
    line: 'Bukit Panjang LRT'
  },
  BP14: {
    code: 'BP14',
    name: 'Ten Mile Junction',
    line: 'Bukit Panjang LRT'
  },
  STC: {
    code: 'STC',
    name: 'Sengkang',
    line: 'Sengkang LRT'
  },
  SE1: {
    code: 'SE1',
    name: 'Compassvale',
    line: 'Sengkang LRT'
  },
  SE2: {
    code: 'SE2',
    name: 'Rumbia',
    line: 'Sengkang LRT'
  },
  SE3: {
    code: 'SE3',
    name: 'Bakau',
    line: 'Sengkang LRT'
  },
  SE4: {
    code: 'SE4',
    name: 'Kangkar',
    line: 'Sengkang LRT'
  },
  SE5: {
    code: 'SE5',
    name: 'Ranggung',
    line: 'Sengkang LRT'
  },
  SW1: {
    code: 'SW1',
    name: 'Cheng Lim',
    line: 'Sengkang LRT'
  },
  SW2: {
    code: 'SW2',
    name: 'Farmway',
    line: 'Sengkang LRT'
  },
  SW3: {
    code: 'SW3',
    name: 'Kupang',
    line: 'Sengkang LRT'
  },
  SW4: {
    code: 'SW4',
    name: 'Thanggam',
    line: 'Sengkang LRT'
  },
  SW5: {
    code: 'SW5',
    name: 'Fernvale',
    line: 'Sengkang LRT'
  },
  SW6: {
    code: 'SW6',
    name: 'Layar',
    line: 'Sengkang LRT'
  },
  SW7: {
    code: 'SW7',
    name: 'Tongkang',
    line: 'Sengkang LRT'
  },
  SW8: {
    code: 'SW8',
    name: 'Renjong',
    line: 'Sengkang LRT'
  },
  PTC: {
    code: 'PTC',
    name: 'Punggol',
    line: 'Punggol LRT'
  },
  PE1: {
    code: 'PE1',
    name: 'Cove',
    line: 'Punggol LRT'
  },
  PE2: {
    code: 'PE2',
    name: 'Meridian',
    line: 'Punggol LRT'
  },
  PE3: {
    code: 'PE3',
    name: 'Coral Edge',
    line: 'Punggol LRT'
  },
  PE4: {
    code: 'PE4',
    name: 'Riviera',
    line: 'Punggol LRT'
  },
  PE5: {
    code: 'PE5',
    name: 'Kadaloor',
    line: 'Punggol LRT'
  },
  PE6: {
    code: 'PE6',
    name: 'Oasis',
    line: 'Punggol LRT'
  },
  PE7: {
    code: 'PE7',
    name: 'Damai',
    line: 'Punggol LRT'
  },
  PW1: {
    code: 'PW1',
    name: 'Sam Kee',
    line: 'Punggol LRT'
  },
  PW2: {
    code: 'PW2',
    name: 'Teck Lee',
    line: 'Punggol LRT'
  },
  PW3: {
    code: 'PW3',
    name: 'Punggol Point',
    line: 'Punggol LRT'
  },
  PW4: {
    code: 'PW4',
    name: 'Samudera',
    line: 'Punggol LRT'
  },
  PW5: {
    code: 'PW5',
    name: 'Nibong',
    line: 'Punggol LRT'
  },
  PW6: {
    code: 'PW6',
    name: 'Sumang',
    line: 'Punggol LRT'
  },
  PW7: {
    code: 'PW7',
    name: 'Soo Teck',
    line: 'Punggol LRT'
  },
  TE1: {
    code: 'TE1',
    name: 'Woodlands North ',
    line: 'Thomson-East Coast Line'
  },
  TE2: {
    code: 'TE2',
    name: 'Woodlands ',
    line: 'Thomson-East Coast Line'
  },
  TE3: {
    code: 'TE3',
    name: 'Woodlands South ',
    line: 'Thomson-East Coast Line'
  }
};
