(() => {
    const SUPABASE_URL = "https://jwxsheouuljvwphgkqmj.supabase.co";
    const SUPABASE_ANON_KEY = "sb_publishable_dGrGrbhSzN61nNiiGSAfLg_wCcA-Shr";
    const REMEMBER_SESSION_KEY = "tameenRememberSession";

    const authStorage = {
        getItem(key) {
            return localStorage.getItem(key) ?? sessionStorage.getItem(key);
        },
        setItem(key, value) {
            if (localStorage.getItem(REMEMBER_SESSION_KEY) === "true") {
                sessionStorage.removeItem(key);
                localStorage.setItem(key, value);
                return;
            }

            localStorage.removeItem(key);
            sessionStorage.setItem(key, value);
        },
        removeItem(key) {
            localStorage.removeItem(key);
            sessionStorage.removeItem(key);
        }
    };

    window.supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY,
        {
            auth: {
                storage: authStorage,
                persistSession: true,
                autoRefreshToken: true
            }
        }
    );
})();
