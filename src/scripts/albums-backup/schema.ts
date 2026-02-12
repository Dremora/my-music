import { z } from "zod";

// --- Artists ---

export const artistSchema = z.strictObject({
  name: z.string(),
  lastModified: z.number(),
  excludeFromReleaseFeed: z.boolean(),
  albumsOnAppleMusic: z.number(),
  appleMusicIDSearchAttempts: z.number(),
  appleMusicID: z.string().optional(),
  sortName: z.string().optional(),
});

export type Artist = z.infer<typeof artistSchema>;

// --- Albums ---

const secondaryArtistSchema = z.strictObject({
  name: z.string(),
  appleMusicID: z.string(),
});

export const albumSchema = z.strictObject({
  uuid: z.string(),
  name: z.string(),
  artist: z.string().optional(),
  nonDerivedArtistName: z.string(),
  sortName: z.string().optional(),
  sortArtistName: z.string().optional(),
  genre: z.string(),
  year: z.string().optional(),
  decade: z.string().optional(),
  dateShortString: z.string().optional(),
  composer: z.string().optional(),
  isCompilation: z.boolean(),
  compilationArtists: z.array(z.string()),
  secondaryArtists: z.array(secondaryArtistSchema),
  isSingle: z.boolean(),
  isCompleteAlbum: z.boolean(),
  isAppleMusic: z.boolean(),
  isInLibrary: z.boolean(),
  appleMusicID: z.string().optional(),
  duration: z.number(),
  durationClassification: z.number(),
  tracksInAlbum: z.number(),
  trackTitlesAsLowercase: z.string(),
  playCount: z.number(),
  lastPlayTime: z.number(),
  hasBeenPlayed: z.boolean(),
  dateAdded: z.number(),
  releaseDate: z.number(),
  preaddUnlockDate: z.number(),
  albumIsPreAdded: z.boolean(),
  pendingReleaseDateUpdate: z.boolean(),
  didChangeYearFromReleaseDate: z.boolean(),
  userOverrodeReleaseDate: z.boolean(),
  userOverrodeArtist: z.boolean(),
  userOverrodeFullAlbum: z.boolean(),
  overrideMusicKit: z.boolean(),
  albumExcludedFromAll: z.boolean(),
  albumHasExcludedSongs: z.boolean(),
  excludedSongsData: z.string().optional(),
  hasDownloaded44AppleMusicInfo: z.boolean(),
  creditDownloadAttempts: z.number(),
  hasAddedCredits: z.boolean(),
  lastCreditsCheck: z.number(),
  lastModified: z.number(),
  discogsURL: z.string().optional(),
  darkModeTintColor: z.string().optional(),
  lightModeTintColor: z.string().optional(),
});

export type Album = z.infer<typeof albumSchema>;

// --- Play History ---

const albumVariationSchema = z.union([
  z.strictObject({ Normal: z.strictObject({}) }),
  z.strictObject({ AppleMusicVersionOfLibrary: z.strictObject({}) }),
  z.strictObject({ IncludeHiddenTracks: z.strictObject({}) }),
]);

export const playHistoryItemSchema = z.strictObject({
  albumName: z.string(),
  albumUUID: z.string().optional(),
  albumVariation: albumVariationSchema,
  alternateServiceID: z.string().optional(),
  artistName: z.string().optional(),
  currentTrackIndex: z.number(),
  currentTrackPlayback: z.number(),
  endTime: z.number(),
  isCompleteListen: z.boolean(),
  isCurrentSession: z.boolean(),
  isResumable: z.boolean(),
  lastModified: z.number(),
  previousEndTime: z.number(),
  previousStartTime: z.number(),
  sessionMediaType: z.string(),
  sessionUUID: z.string(),
  songSessionData: z.string().optional(),
  sourceRaw: z.string(),
  startTime: z.number(),
  tracksInAlbum: z.number(),
  tracksListened: z.number(),
  workoutActivityType: z.number(),
});

export type PlayHistoryItem = z.infer<typeof playHistoryItemSchema>;

// --- Credits: People ---

export const creditPersonSchema = z.strictObject({
  name: z.string(),
  creditTypes: z.string(),
  lastModified: z.number(),
  hasDownloadedEntireDiscography: z.boolean(),
  hasDownloadedPreviewDiscography: z.boolean(),
  totalDiscogsReleases: z.number(),
  discogsID: z.string().optional(),
  musicBrainzID: z.string().optional(),
});

export type CreditPerson = z.infer<typeof creditPersonSchema>;

// --- Credits: Labels ---

export const creditLabelSchema = z.strictObject({
  name: z.string(),
  albums: z.array(z.string()),
  mbid: z.string(),
  lastModified: z.number(),
  hasDownloadedEntireDiscography: z.boolean(),
  hasDownloadedPartialDiscography: z.boolean(),
  includeInReleaseFeed: z.boolean(),
  totalAlbumsPerMB: z.number(),
  appleMusicID: z.string().optional(),
});

export type CreditLabel = z.infer<typeof creditLabelSchema>;

// --- Credits: Entries ---

export const creditEntrySchema = z.strictObject({
  creditType: z.string(),
  roleName: z.string(),
  nonDerivedName: z.string(),
  nonDerivedAlbumTitle: z.string(),
  source: z.string(),
  targetType: z.string(),
  fullAlbum: z.boolean(),
  tracks: z.array(z.number()),
  lastModified: z.number(),
  albumUUID: z.string().optional(),
  attributeValue: z.string().optional(),
  displayTitle: z.string().optional(),
});

export type CreditEntry = z.infer<typeof creditEntrySchema>;

// --- Misc: Release Feed Objects ---

export const releaseFeedObjectSchema = z.strictObject({
  albumName: z.string(),
  albumUUID: z.string(),
  artistName: z.string(),
  dateCreated: z.number(),
  descriptionText: z.string(),
  discoverySourceTypeString: z.string(),
  hasBeenSeen: z.boolean(),
  includeInReleaseFeed: z.boolean(),
  lastModified: z.number(),
  releaseDate: z.number(),
  releaseFeedTypeString: z.string(),
});

export type ReleaseFeedObject = z.infer<typeof releaseFeedObjectSchema>;

// --- Misc: Tags ---

const tagAlbumIdSchema = z.strictObject({
  appleMusicID: z.string().optional(),
  uuid: z.string(),
});

export const tagSchema = z.strictObject({
  name: z.string(),
  hex: z.string(),
  lastModified: z.number(),
  albumsAndIDs: z.array(tagAlbumIdSchema),
  sessionIDs: z.array(z.unknown()),
});

export type Tag = z.infer<typeof tagSchema>;

// --- Misc: Quick Actions ---

const quickActionFilterItemSchema = z.strictObject({
  groupType: z.string(),
  filterOption: z.string(),
  comparisonOperator: z.string(),
  id: z.string(),
  comparisonValue: z.string(),
});

export const quickActionSchema = z.strictObject({
  name: z.string(),
  uuid: z.string(),
  charmType: z.string(),
  colorHex: z.string(),
  description: z.string(),
  encodedCollectionInfo: z.string(),
  filterArray: z.array(quickActionFilterItemSchema),
  indexInDock: z.number(),
  isInDock: z.boolean(),
  lastModified: z.number(),
  shortcutSet: z.boolean(),
  preferredCollectionDisplayInt: z.number().optional(),
});

export type QuickAction = z.infer<typeof quickActionSchema>;

// --- Misc: Previous Searches ---

export const previousSearchSchema = z.strictObject({
  dateSearched: z.number(),
  persistentID: z.string(),
  title: z.string(),
  type: z.string(),
});

export type PreviousSearch = z.infer<typeof previousSearchSchema>;

// --- App Settings (misc section) ---

export const appSettingsSchema = z.strictObject({
  name: z.string(),
  releaseFeedObjects: z.array(releaseFeedObjectSchema),
  tags: z.array(tagSchema),
  quickActions: z.array(quickActionSchema),
  filters: z.array(z.unknown()),
  previousSearches: z.array(previousSearchSchema),
  notes: z.array(z.unknown()),
});

export type AppSettings = z.infer<typeof appSettingsSchema>;

// --- Top-level backup ---

export type AlbumsAppBackup = {
  albumsAndArtists: {
    albums: Album[];
    artists: Artist[];
  };
  credits: {
    credits: CreditEntry[];
    labels: CreditLabel[];
    people: CreditPerson[];
  };
  misc: AppSettings;
  playHistory: PlayHistoryItem[];
};
