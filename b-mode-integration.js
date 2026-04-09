/**
 * B MODE INTEGRATION FOR 2882 2ND FLOOR PROJECT
 * Replaces direct Claude calls with ensemble routing
 * Adds learning loop + batch processing
 */

const MainRouter = require('../../MAIN-ROUTER.js');

class WarehouseProjectRouter {
  constructor() {
    this.router = new MainRouter();
    this.project_name = '2882-2nd-floor';
    console.log('✅ B Mode integrated for 2882 2nd Floor Project');
  }

  /**
   * Process customer inquiry with ensemble consensus
   */
  async processInquiry(inquiry) {
    const { name, company, email, phone, sqft, duration, details } = inquiry;

    // Classify inquiry type
    const inquiryText = `${details} - ${sqft}sqft for ${duration}`;
    const classification = await this.router.processTask(
      'Classify warehouse inquiry',
      `Classify as: availability, pricing, tour, lease-terms, or other. Inquiry: "${inquiryText}"`
    );

    console.log(`📋 Inquiry from ${name}: ${classification.answer}`);

    // Generate response
    const responsePrompt = `
      Generate professional response to warehouse inquiry.
      Inquiry: ${inquiryText}
      Company: ${company}
      
      Include: acknowledgment, facility highlights, next steps, contact info.
      Professional but friendly tone.
    `;

    const response = await this.router.processTask(
      'Draft warehouse inquiry response',
      responsePrompt
    );

    return {
      inquiry_id: email,
      classification: classification.answer,
      response: response.answer,
      confidence: response.confidence,
      ensemble_used: response.ensemble_used,
      ready_for_feedback: true
    };
  }

  /**
   * Summarize inquiry for internal team
   */
  async summarizeForTeam(inquiry, response) {
    const summary = await this.router.processTask(
      'Summarize warehouse inquiry for team',
      `
        Customer: ${inquiry.name}
        Company: ${inquiry.company}
        Space needed: ${inquiry.sqft} sqft for ${inquiry.duration}
        Details: ${inquiry.details}
        
        Summarize in 1-2 sentences for internal team.
      `
    );

    return summary.answer;
  }

  /**
   * Extract key data from inquiry for database
   */
  async extractData(inquiryText) {
    const extraction = await this.router.processTask(
      'Extract warehouse inquiry data',
      `
        Extract from inquiry: sqft needed, duration, urgency, budget mention, use case.
        Format as JSON.
        Text: "${inquiryText}"
      `
    );

    try {
      return JSON.parse(extraction.answer);
    } catch {
      return { raw: extraction.answer };
    }
  }

  /**
   * Record user feedback for learning
   */
  recordFeedback(inquiry, response, feedback, rating) {
    this.router.recordUserFeedback(
      { category: 'warehouse_inquiry', type: inquiry.type },
      response,
      feedback,
      rating
    );

    console.log(`✅ Feedback recorded: ${rating}/5 - system learning`);
    return this.router.getStats();
  }

  /**
   * Get project stats
   */
  getStats() {
    return this.router.getStats();
  }
}

module.exports = WarehouseProjectRouter;
