export interface UserEntity {
  OriginApplication: number;
  Alias: string;
  Name: string;
  UserType: number;
  Email: string;
  Password: string;
  Gender: number;
  PhoneInternational: string;
  PhoneDDD: string;
  PhoneNumber: string;
  CNPJ: string;
  CPF: string;
  Address: {
    Street: string;
    Number: string;
    Complement: string;
    Neighborhood: string;
    ZipCode: string;
    City: string;
    State: string;
    Latitude: number;
    Longitude: number;
  };
  IsBarista: boolean;
  IsAmbassador: boolean;
  ChargeTaxFee: number;
  DateOfBirth: string;
  ResponsibleName: string;
  ResponsibleCPF: string;
  ResponsiblePhone: string;
  ResponsibleEmail: string;
  ResponsibleOccupation: string;
  ResponsibleMonthlyIncome: number;
  AnnualRevenue: number;
  BankAccount: {
    BankCode: string;
    BankBranchNumber: string;
    BankBranchCheckDigit: string;
    BankAccountNumber: string;
    BankAccountCheckDigit: string;
    BankAccountType: string;
    PixKey: string;
  };
  TransferSettings: {
    TransferEnabled: boolean;
    TransferInterval: string;
    TransferDay: number;
    TransferStatementDescriptor: string;
  };
  AutomaticAnticipationSettings: {
    AutoAnticipationEnabled: boolean;
    AutoAnticipationType: string;
    AutoAnticipationVolumePercentage: number;
    AutoAnticipationDelay: number;
  };
  IsOpenShop: boolean;
}

export type UserDTO = Omit<UserEntity, "id">;

export type UserUpdateDTO = Omit<UserDTO, "TransferSettings">;

export const nullUserData: UserDTO = {
  OriginApplication: 1,
  Alias: "",
  Name: "",
  UserType: 0,
  Gender: 0,
  Email: "",
  Password: "",
  PhoneInternational: "",
  PhoneDDD: "",
  PhoneNumber: "",
  CNPJ: "",
  CPF: "",
  Address: {
    Street: "",
    Number: "",
    Complement: "",
    Neighborhood: "",
    ZipCode: "",
    City: "",
    State: "",
    Latitude: 0,
    Longitude: 0
  },
  IsBarista: false,
  IsAmbassador: false,
  ChargeTaxFee: 0,
  DateOfBirth: "",
  ResponsibleName: "",
  ResponsibleCPF: "",
  ResponsiblePhone: "",
  ResponsibleEmail: "",
  ResponsibleOccupation: "",
  ResponsibleMonthlyIncome: 0,
  AnnualRevenue: 0,
  BankAccount: {
    BankCode: "",
    BankBranchNumber: "",
    BankBranchCheckDigit: "",
    BankAccountNumber: "",
    BankAccountCheckDigit: "",
    BankAccountType: "",
    PixKey: ""
  },
  TransferSettings: {
    TransferEnabled: true,
    TransferInterval: "Monthly",
    TransferDay: 10,
    TransferStatementDescriptor: ""
  },
  AutomaticAnticipationSettings: {
    AutoAnticipationEnabled: true,
    AutoAnticipationType: "Full",
    AutoAnticipationVolumePercentage: 85,
    AutoAnticipationDelay: 14
  },
  IsOpenShop: false
};
