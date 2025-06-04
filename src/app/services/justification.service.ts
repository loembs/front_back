validateJustification(dto: { justificationId: string; enumJustification: string }) {
  return this.http.post(`${this.apiUrl}/api/justification/validate`, dto);
} 