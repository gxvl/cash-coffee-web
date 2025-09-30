export interface UserEntity {
  originApplication: number;
  alias: string;
  name: string;
  userType: number;
  email: string;
  password: string;
  phoneInternational: string;
  phoneDDD: string;
  phoneNumber: string;
  cnpj: string | null;
  address: {
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    zipCode: string;
    city: string;
    state: string;
    latitude: number;
    longitude: number;
  };
  isBarista: boolean;
  chargeTaxFee: number;
  dateOfBirth?: string;
  responsibleName?: string;
  responsibleCPF?: string;
  responsiblePhone?: string;
  responsibleEmail?: string;
  bankAccount: {
    bankCode: string;
    bankBranchNumber: string;
    bankBranchCheckDigit: string;
    bankAccountNumber: string;
    bankAccountCheckDigit: string;
    bankAccountType: string;
    pixKey?: string;
  };
  transferSettings?: {
    transferEnabled: boolean;
    transferInterval: string;
    transferDay: number;
    transferStatementDescriptor: string;
  };
  automaticAnticipationSettings?: {
    autoAnticipationEnabled: boolean;
    autoAnticipationType: string;
    autoAnticipationVolumePercentage: number;
    autoAnticipationDelay: number;
  };
}

export type UserDTO = Omit<UserEntity, "id">;

export const nullUserData: UserDTO = {
  originApplication: 2,
  alias: "",
  name: "",
  userType: 0,
  email: "",
  password: "",
  phoneInternational: "",
  phoneDDD: "",
  phoneNumber: "",
  cnpj: null,
  address: {
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    zipCode: "",
    city: "",
    state: "",
    latitude: 0,
    longitude: 0
  },
  isBarista: false,
  chargeTaxFee: 0,
  dateOfBirth: "",
  responsibleName: "",
  responsibleCPF: "",
  responsiblePhone: "",
  responsibleEmail: "",
  bankAccount: {
    bankCode: "",
    bankBranchNumber: "",
    bankBranchCheckDigit: "",
    bankAccountNumber: "",
    bankAccountCheckDigit: "",
    bankAccountType: "",
    pixKey: ""
  },
  transferSettings: {
    transferEnabled: false,
    transferInterval: "",
    transferDay: 0,
    transferStatementDescriptor: ""
  },
  automaticAnticipationSettings: {
    autoAnticipationEnabled: false,
    autoAnticipationType: "",
    autoAnticipationVolumePercentage: 0,
    autoAnticipationDelay: 2
  }
};
