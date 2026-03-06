// Frontend API Service for Zainussunna Academy
// Handles all backend communication with proper error handling.
// Default: localhost for local development
// Set REACT_APP_API_URL=https://api.zainussunnaacademy.com/api for production

const API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:8000/api/core";

// Endpoints that don't require authentication (public endpoints)
const PUBLIC_ENDPOINTS = [
  "/programs/",
  "/achievements/",
  "/gallery/",
  "/faculty/",
  "/content/",
  "/health/",
  "/enquiries/",
];

class ApiService {
  constructor() {
    this.baseUrl = API_BASE;
    this.token = localStorage.getItem("accessToken");
  }

  isPublicEndpoint(endpoint) {
    // Check if the endpoint starts with any public endpoint path
    return PUBLIC_ENDPOINTS.some((publicEndpoint) =>
      endpoint.startsWith(publicEndpoint),
    );
  }

  getHeaders(includeAuth = true) {
    const headers = {
      "Content-Type": "application/json",
    };
    // Only add auth token if includeAuth is true AND token exists AND endpoint is not public
    if (
      includeAuth &&
      this.token &&
      !this.isPublicEndpoint(this.requestEndpoint || "")
    ) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }
    return headers;
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem("accessToken", token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  // Generic request handler
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    // Store the endpoint for isPublicEndpoint check
    this.requestEndpoint = endpoint;

    // Determine if we should include auth - default to true
    // But set to false for public endpoints automatically
    const includeAuth =
      options.auth !== false && !this.isPublicEndpoint(endpoint);

    const config = {
      ...options,
      headers: {
        ...this.getHeaders(includeAuth),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      // Only handle 401 for authenticated endpoints (non-public endpoints)
      if (response.status === 401 && !this.isPublicEndpoint(endpoint)) {
        // Try to refresh token
        const refreshed = await this.refreshToken();
        if (refreshed) {
          // Retry request with new token
          config.headers["Authorization"] = `Bearer ${this.token}`;
          const retryResponse = await fetch(url, config);
          if (retryResponse.ok) {
            return retryResponse.json();
          }
        }
        this.clearToken();
        throw new Error("Session expired. Please login again.");
      }

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(
          error.detail || error.message || `HTTP ${response.status}`,
        );
      }

      return response.json();
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  // Authentication
  async login(username, password) {
    const data = await this.request("/auth/token/", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      auth: false,
    });
    this.setToken(data.access);
    localStorage.setItem("refreshToken", data.refresh);
    return data;
  }

  async refreshToken() {
    const refresh = localStorage.getItem("refreshToken");
    if (!refresh) return false;

    try {
      const data = await this.request("/auth/token/refresh/", {
        method: "POST",
        body: JSON.stringify({ refresh }),
        auth: false,
      });
      this.setToken(data.access);
      return true;
    } catch {
      this.clearToken();
      return false;
    }
  }

  // Programs - Public endpoint
  async getPrograms() {
    return this.request("/programs/");
  }

  async getProgramSchema(programId) {
    return this.request(`/programs/${programId}/schema/`);
  }

  // Admissions - Public (no auth required for submission)
  async createAdmission(data) {
    return this.request("/admissions/", {
      method: "POST",
      body: JSON.stringify(data),
      auth: false, // Public: no auth required
    });
  }

  async getAdmissions(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    return this.request(`/admissions/${params ? `?${params}` : ""}`, {
      auth: true,
    });
  }

  async getAdmission(id) {
    return this.request(`/admissions/${id}/`, {
      auth: true,
    });
  }

  async completeStep(id, stepData, timeSpent = 0) {
    return this.request(`/admissions/${id}/complete_step/`, {
      method: "POST",
      body: JSON.stringify({ step_data: stepData, time_spent: timeSpent }),
      auth: false, // Public: no auth required for submission flow
    });
  }

  async submitAdmission(id) {
    return this.request(`/admissions/${id}/submit/`, {
      method: "POST",
      auth: false, // Public: no auth required for submission flow
    });
  }

  async getAdmissionStatus(id) {
    return this.request(`/admissions/${id}/status/`, {
      auth: false, // Public: no auth required for submission flow
    });
  }

  // Admin Actions - Requires auth
  async transitionState(id, newState, reason = "") {
    return this.request(`/admissions/${id}/transition/`, {
      method: "POST",
      body: JSON.stringify({ new_state: newState, reason }),
      auth: true,
    });
  }

  async addNote(id, note) {
    return this.request(`/admissions/${id}/add_note/`, {
      method: "POST",
      body: JSON.stringify(note),
      auth: true,
    });
  }

  // Content - Public endpoint
  async getContentPages() {
    return this.request("/content/");
  }

  async getContentPage(slug) {
    return this.request(`/content/${slug}/`);
  }

  // Achievements - Public endpoint
  async getAchievements(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    return this.request(`/achievements/${params ? `?${params}` : ""}`);
  }

  // Gallery - Public endpoint
  async getGalleryItems() {
    return this.request("/gallery/");
  }

  async getLatestGallery() {
    return this.request("/gallery/latest/");
  }

  // Faculty - Public endpoint
  async getFaculty() {
    return this.request("/faculty/");
  }

  // Enquiries - Public endpoint (no auth needed for creating)
  async createEnquiry(data) {
    return this.request("/enquiries/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getEnquiries(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    return this.request(`/enquiries/${params ? `?${params}` : ""}`, {
      auth: true,
    });
  }

  // Analytics - Requires auth
  async getAnalytics(days = 30) {
    return this.request(`/analytics/admissions/?days=${days}`, {
      auth: true,
    });
  }

  async getDashboard() {
    return this.request("/analytics/dashboard/", {
      auth: true,
    });
  }

  // WhatsApp Config - Public endpoint
  async getWhatsAppConfig() {
    return this.request("/whatsapp/config/");
  }

  async saveWhatsAppConfig(data) {
    return this.request("/whatsapp/config/", {
      method: "POST",
      body: JSON.stringify(data),
      auth: true,
    });
  }

  async generateWhatsAppMessage(admissionId, messageType = "success") {
    return this.request("/whatsapp/generate_message/", {
      method: "POST",
      body: JSON.stringify({
        admission_id: admissionId,
        message_type: messageType,
      }),
      auth: false, // Public: no auth required
    });
  }

  // Health Check - Public endpoint
  async healthCheck() {
    return this.request("/health/");
  }
}

export const api = new ApiService();
export default api;
