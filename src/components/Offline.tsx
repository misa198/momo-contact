import { Icon } from '@iconify/react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Offline() {
  const { t } = useTranslation();
  const [status, setStatus] = useState(true);

  const changeStatus = useCallback(() => {
    if (navigator.onLine && !status) {
      confirm(t('messages.go_back_online'));
      window.location.reload();
    }
    setStatus(navigator.onLine);
  }, [status, t]);

  useEffect(() => {
    window.addEventListener('online', changeStatus);
    window.addEventListener('offline', changeStatus);
    return () => {
      window.removeEventListener('online', changeStatus);
      window.removeEventListener('offline', changeStatus);
    };
  }, [changeStatus]);

  if (status) return null;
  return (
    <div className="fixed bottom-4 right-4 rounded-full border p-2 border-gray-400">
      <Icon icon="tabler:wifi-off" className="text-gray-600 text-xl" />
    </div>
  );
}
