export const getDefaultDate = (): string => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };
  
  export const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', weekday: 'long' };
    return new Intl.DateTimeFormat('tr-TR', options).format(new Date(dateString));
  };
  