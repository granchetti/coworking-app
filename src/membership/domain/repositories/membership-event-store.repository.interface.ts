export interface IMembershipEventStoreRepository {
  save(event: any): Promise<void>;
}
