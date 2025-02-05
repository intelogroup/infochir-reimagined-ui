export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      article_authors: {
        Row: {
          article_id: string
          member_id: number
        }
        Insert: {
          article_id: string
          member_id: number
        }
        Update: {
          article_id?: string
          member_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "article_authors_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_authors_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      article_submissions: {
        Row: {
          abstract: string
          article_files_urls: string[] | null
          authors: string
          corresponding_author_address: string
          corresponding_author_email: string
          corresponding_author_name: string
          corresponding_author_phone: string
          created_at: string
          ethics_approval: boolean
          id: number
          image_annexes_urls: string[] | null
          institution: string
          keywords: string
          no_conflict: boolean
          original_work: boolean
          pdf_url: string | null
          publication_type: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          abstract: string
          article_files_urls?: string[] | null
          authors: string
          corresponding_author_address: string
          corresponding_author_email: string
          corresponding_author_name: string
          corresponding_author_phone: string
          created_at?: string
          ethics_approval?: boolean
          id?: number
          image_annexes_urls?: string[] | null
          institution: string
          keywords: string
          no_conflict?: boolean
          original_work?: boolean
          pdf_url?: string | null
          publication_type: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          abstract?: string
          article_files_urls?: string[] | null
          authors?: string
          corresponding_author_address?: string
          corresponding_author_email?: string
          corresponding_author_name?: string
          corresponding_author_phone?: string
          created_at?: string
          ethics_approval?: boolean
          id?: number
          image_annexes_urls?: string[] | null
          institution?: string
          keywords?: string
          no_conflict?: boolean
          original_work?: boolean
          pdf_url?: string | null
          publication_type?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      articles: {
        Row: {
          abstract: string
          authors: string[]
          category: string
          citations: number | null
          created_at: string | null
          downloads: number | null
          id: string
          image_url: string | null
          pdf_url: string | null
          publication_date: string | null
          shares: number | null
          source: string
          tags: string[] | null
          title: string
          updated_at: string | null
          views: number | null
        }
        Insert: {
          abstract: string
          authors?: string[]
          category: string
          citations?: number | null
          created_at?: string | null
          downloads?: number | null
          id?: string
          image_url?: string | null
          pdf_url?: string | null
          publication_date?: string | null
          shares?: number | null
          source: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          abstract?: string
          authors?: string[]
          category?: string
          citations?: number | null
          created_at?: string | null
          downloads?: number | null
          id?: string
          image_url?: string | null
          pdf_url?: string | null
          publication_date?: string | null
          shares?: number | null
          source?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          views?: number | null
        }
        Relationships: []
      }
      donations: {
        Row: {
          amount: number
          checkout_session_id: string | null
          completed_at: string | null
          created_at: string
          currency: string
          donor_email: string | null
          donor_name: string | null
          id: string
          is_anonymous: boolean | null
          message: string | null
          payment_intent_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          amount: number
          checkout_session_id?: string | null
          completed_at?: string | null
          created_at?: string
          currency?: string
          donor_email?: string | null
          donor_name?: string | null
          id?: string
          is_anonymous?: boolean | null
          message?: string | null
          payment_intent_id?: string | null
          status: string
          updated_at?: string
        }
        Update: {
          amount?: number
          checkout_session_id?: string | null
          completed_at?: string | null
          created_at?: string
          currency?: string
          donor_email?: string | null
          donor_name?: string | null
          id?: string
          is_anonymous?: boolean | null
          message?: string | null
          payment_intent_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      members: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          id: number
          name: string
          phone: string | null
          titre: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id?: number
          name: string
          phone?: string | null
          titre?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id?: number
          name?: string
          phone?: string | null
          titre?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      newsletter_subscriptions: {
        Row: {
          email: string
          id: number
          is_active: boolean
          name: string
          phone: string | null
          subscribed_at: string
        }
        Insert: {
          email: string
          id?: never
          is_active?: boolean
          name: string
          phone?: string | null
          subscribed_at?: string
        }
        Update: {
          email?: string
          id?: never
          is_active?: boolean
          name?: string
          phone?: string | null
          subscribed_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_payment_intent: {
        Args: {
          amount: number
          currency: string
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
