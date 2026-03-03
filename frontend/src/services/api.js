// Frontend API Service for Zainussunna Academy
// Handles all backend communication with proper error handling.

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

class ApiService {
  constructor() {
    this.baseUrl = API_BASE;
    this.token = localStorage.getItem("accessToken");
  }

  getHeaders() {
    const headers = {
      "Content-Type": "application/json",
    };
    if (this.token) {
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
    const config = {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (response.status === 401) {
        // Try to refresh token
        const refreshed = await this.refreshToken();
        if (refreshed) {
          // Retry request
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
      });
      this.setToken(data.access);
      return true;
    } catch {
      this.clearToken();
      return false;
    }
  }

  // Programs
  async getPrograms() {
    return this.request("/programs/");
  }

  async getProgramSchema(programId) {
    return this.request(`/programs/${programId}/schema/`);
  }

  // Admissions
  async createAdmission(data) {
    return this.request("/admissions/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getAdmissions(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    return this.request(`/admissions/${params ? `?${params}` : ""}`);
  }

  async getAdmission(id) {
    return this.request(`/admissions/${id}/`);
  }

  async completeStep(id, stepData, timeSpent = 0) {
    return this.request(`/admissions/${id}/complete_step/`, {
      method: "POST",
      body: JSON.stringify({ step_data: stepData, time_spent: timeSpent }),
    });
  }

  async submitAdmission(id) {
    return this.request(`/admissions/${id}/submit/`, {
      method: "POST",
    });
  }

  async getAdmissionStatus(id) {
    return this.request(`/admissions/${id}/status/`);
  }

  // Admin Actions
  async transitionState(id, newState, reason = "") {
    return this.request(`/admissions/${id}/transition/`, {
      method: "POST",
      body: JSON.stringify({ new_state: newState, reason }),
    });
  }

  async addNote(id, note) {
    return this.request(`/admissions/${id}/add_note/`, {
      method: "POST",
      body: JSON.stringify(note),
    });
  }

  // Content
  async getContentPages() {
    return this.request("/content/");
  }

  async getContentPage(slug) {
    return this.request(`/content/${slug}/`);
  }

  // Achievements
  async getAchievements(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    return this.request(`/achievements/${params ? `?${params}` : ""}`);
  }

  // Gallery
  async getGalleryItems() {
    return this.request("/gallery/");
  }

  async getLatestGallery() {
    return this.request("/gallery/latest/");
  }

  // Faculty
  async getFaculty() {
    return this.request("/faculty/");
  }

  // Enquiries
  async createEnquiry(data) {
    return this.request("/enquiries/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getEnquiries(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    return this.request(`/enquiries/${params ? `?${params}` : ""}`);
  }

  // Analytics
  async getAnalytics(days = 30) {
    return this.request(`/analytics/admissions/?days=${days}`);
  }

  async getDashboard() {
    return this.request("/analytics/dashboard/");
  }

  // Health Check
  async healthCheck() {
    return this.request("/health/");
  }
}

export const api = new ApiService();
export default api;
