import { z } from "zod";

export const ReminderSchema = z.object({
  id: z.number(),
  title: z.string(),
  time: z.string().optional(),
  date: z.string().optional(),
  tag: z.string().optional(),
  details: z.string().optional(),
});

export const AnnouncementSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  link: z.string().optional(),
});

export const DashboardDataSchema = z.object({
  todaysReminders: z.array(ReminderSchema),
  upcomingReminders: z.array(ReminderSchema),
  birthdayStudent: z.string().nullable().optional(),
  announcements: z.array(AnnouncementSchema).optional(),
});

export const DashboardApiResponseSchema = z.object({
  success: z.boolean(),
  data: DashboardDataSchema.optional(),
  error: z.string().optional(),
});

export type DashboardData = z.infer<typeof DashboardDataSchema>;
export type Reminder = z.infer<typeof ReminderSchema>;
export type Announcement = z.infer<typeof AnnouncementSchema>;

export async function fetchDashboardData(): Promise<DashboardData> {
  const response = await fetch("/api/dashboard");
  const json = await response.json();
  
  const parsed = DashboardApiResponseSchema.parse(json);
  
  if (!parsed.success || !parsed.data) {
    throw new Error(parsed.error || "Failed to fetch dashboard data");
  }
  
  return parsed.data;
}

// Reminders Module
export const GroupedReminderSchema = z.object({
  date: z.string(),
  day: z.string(),
  reminders: z.array(z.object({
    id: z.number(),
    title: z.string(),
    details: z.string().optional()
  }))
});

export const RemindersPageDataSchema = z.object({
  page: z.number(),
  totalPages: z.number(),
  groupedReminders: z.array(GroupedReminderSchema)
});

export const RemindersApiResponseSchema = z.object({
  success: z.boolean(),
  data: RemindersPageDataSchema.optional(),
  error: z.string().optional(),
});

export type RemindersPageData = z.infer<typeof RemindersPageDataSchema>;
export type GroupedReminder = z.infer<typeof GroupedReminderSchema>;

export async function fetchReminders(page: number): Promise<RemindersPageData> {
  const response = await fetch(`/api/reminders?page=${page}`);
  const json = await response.json();
  
  const parsed = RemindersApiResponseSchema.parse(json);
  
  if (!parsed.success || !parsed.data) {
    throw new Error(parsed.error || "Failed to fetch reminders");
  }
  
  return parsed.data;
}

// Topic Module
export const TopicSchema = z.object({
  id: z.number(),
  month: z.string(),
  week: z.string(),
  subject: z.string(),
  topic: z.string(),
  activities: z.string(),
  task: z.string(),
});

export const TopicsPageDataSchema = z.object({
  topics: z.array(TopicSchema),
  availableMonths: z.array(z.string()),
  availableWeeks: z.array(z.string()),
});

export const TopicsApiResponseSchema = z.object({
  success: z.boolean(),
  data: TopicsPageDataSchema.optional(),
  error: z.string().optional(),
});

export type Topic = z.infer<typeof TopicSchema>;
export type TopicsPageData = z.infer<typeof TopicsPageDataSchema>;

export async function fetchTopics(month?: string, week?: string): Promise<TopicsPageData> {
  const params = new URLSearchParams();
  if (month) params.append("month", month);
  if (week) params.append("week", week);
  
  const response = await fetch(`/api/topics?${params.toString()}`);
  const json = await response.json();
  
  const parsed = TopicsApiResponseSchema.parse(json);
  
  if (!parsed.success || !parsed.data) {
    throw new Error(parsed.error || "Failed to fetch topics");
  }
  
  return parsed.data;
}

// Gallery Module
export const GalleryFolderSchema = z.object({
  id: z.string(),
  name: z.string(),
  modifiedTime: z.string().optional(),
});

export const GalleryImageSchema = z.object({
  id: z.string(),
  name: z.string(),
  thumbnailLink: z.string().optional(),
  webContentLink: z.string().optional(),
  width: z.number(),
  height: z.number(),
});

export const GalleryImagesPageSchema = z.object({
  images: z.array(GalleryImageSchema),
  nextPageToken: z.string().nullable().optional(),
});

export type GalleryFolder = z.infer<typeof GalleryFolderSchema>;
export type GalleryImage = z.infer<typeof GalleryImageSchema>;

export async function fetchGalleryFolders(): Promise<GalleryFolder[]> {
  const response = await fetch('/api/gallery');
  const json = await response.json();
  if (!json.success || !json.data) throw new Error(json.error || "Failed to fetch gallery folders");
  return z.array(GalleryFolderSchema).parse(json.data);
}

export async function fetchGalleryImages(folderId: string, pageToken?: string): Promise<z.infer<typeof GalleryImagesPageSchema>> {
  const url = new URL(`/api/gallery/${folderId}`, window.location.origin);
  if (pageToken) url.searchParams.append("pageToken", pageToken);
  
  const response = await fetch(url.toString());
  const json = await response.json();
  if (!json.success || !json.data) throw new Error(json.error || "Failed to fetch gallery images");
  
  return GalleryImagesPageSchema.parse(json.data);
}

// PDF Document Module
export const PdfDocumentSchema = z.object({
  id: z.string(),
  name: z.string(),
  thumbnailLink: z.string().optional(),
  webContentLink: z.string().optional(), // download link
});

export type PdfDocument = z.infer<typeof PdfDocumentSchema>;

export async function fetchSchedule(): Promise<PdfDocument[]> {
  const response = await fetch('/api/schedule');
  const json = await response.json();
  if (!json.success || !json.data) throw new Error(json.error || "Failed to fetch schedule PDFs");
  return z.array(PdfDocumentSchema).parse(json.data);
}

export async function fetchMaterials(): Promise<PdfDocument[]> {
  const response = await fetch('/api/materials');
  const json = await response.json();
  if (!json.success || !json.data) throw new Error(json.error || "Failed to fetch materials PDFs");
  return z.array(PdfDocumentSchema).parse(json.data);
}

// Behaviour Module
export const StudentAuthSchema = z.object({
  studentId: z.string(),
  name: z.string(),
  gender: z.string().optional(),
});

export const BehaviourRecordSchema = z.object({
  id: z.string(),
  date: z.string(),
  behaviour: z.string(),
  notes: z.string().optional(),
});

export type StudentAuth = z.infer<typeof StudentAuthSchema>;
export type BehaviourRecord = z.infer<typeof BehaviourRecordSchema>;

export async function verifyPin(pin: string): Promise<StudentAuth> {
  const response = await fetch('/api/pin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pin }),
  });
  
  const json = await response.json();
  if (!json.success || !json.data) throw new Error(json.error || "Invalid PIN");
  return StudentAuthSchema.parse(json.data);
}

export async function fetchBehaviour(studentId: string): Promise<BehaviourRecord[]> {
  const response = await fetch(`/api/behaviour?studentId=${studentId}`);
  const json = await response.json();
  if (!json.success || !json.data) throw new Error(json.error || "Failed to fetch behaviour records");
  return z.array(BehaviourRecordSchema).parse(json.data);
}

// Global Search Module
export const GlobalSearchResultSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.string(),
  url: z.string(),
  thumbnail: z.string().optional(),
});

export type GlobalSearchResult = z.infer<typeof GlobalSearchResultSchema>;

export async function fetchGlobalSearch(query: string): Promise<GlobalSearchResult[]> {
  if (!query || query.length < 2) return [];
  const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  const json = await response.json();
  if (!json.success || !json.data) throw new Error(json.error || "Search failed");
  return z.array(GlobalSearchResultSchema).parse(json.data);
}
