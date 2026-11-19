import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  Search,
  Send,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import GuestOnlineForm from "@/components/forms/GuestOnline_form";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const submittedDocuments = [
  {
    id: "DOC-2026-0087",
    subject: "Certificate of Enrollment",
    type: "Request",
    submitted: "Nov 18, 2026",
    status: "Pending",
  },
  {
    id: "DOC-2026-0079",
    subject: "School Clearance",
    type: "Application",
    submitted: "Nov 15, 2026",
    status: "In Transit",
  },
  {
    id: "DOC-2026-0068",
    subject: "Monthly Accomplishment Report",
    type: "Report",
    submitted: "Nov 10, 2026",
    status: "Received",
  },
];

export function ClientDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full space-y-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-1 text-sm font-medium text-primary">Client Portal</p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            My Documents
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            View your submissions and monitor their current status.
          </p>
        </div>
        <Button className="w-full sm:w-auto" onClick={() => navigate("/client/submit")}>
          <Send className="mr-2 size-4" />
          Submit a Document
        </Button>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          {
            title: "Submitted",
            value: "3",
            detail: "Total documents",
            icon: FileText,
            tone: "bg-primary/10 text-primary",
          },
          {
            title: "Pending",
            value: "1",
            detail: "For review",
            icon: Clock3,
            tone: "bg-amber-500/10 text-amber-600",
          },
          {
            title: "Completed",
            value: "1",
            detail: "Received",
            icon: CheckCircle2,
            tone: "bg-emerald-500/10 text-emerald-600",
          },
        ].map(({ title, value, detail, icon: Icon, tone }) => (
          <Card key={title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              <div className={`rounded-lg p-2 ${tone}`}>
                <Icon className="size-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tabular-nums">{value}</div>
              <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold">Recent Submissions</h3>
            <p className="text-sm text-muted-foreground">
              Documents submitted under your account.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/client/tracking")}
          >
            Track documents
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-sm">
              <thead>
                <tr className="border-b bg-muted/40 text-left text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Reference</th>
                  <th className="px-4 py-3 font-medium">Subject</th>
                  <th className="px-4 py-3 font-medium">Document Type</th>
                  <th className="px-4 py-3 font-medium">Submitted</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {submittedDocuments.map((document) => (
                  <tr key={document.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-4 font-medium">{document.id}</td>
                    <td className="px-4 py-4">{document.subject}</td>
                    <td className="px-4 py-4 text-muted-foreground">{document.type}</td>
                    <td className="px-4 py-4 text-muted-foreground">{document.submitted}</td>
                    <td className="px-4 py-4"><StatusBadge status={document.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </div>
  );
}

export function ClientTracking() {
  const [search, setSearch] = useState("");
  const filtered = submittedDocuments.filter((document) =>
    `${document.id} ${document.subject} ${document.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-1 text-sm font-medium text-primary">Client Portal</p>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Document Tracking</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Search and monitor the status of your submitted documents.
        </p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Search reference, subject, or status"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-sm">
            <thead>
              <tr className="border-b bg-muted/40 text-left text-muted-foreground">
                <th className="px-4 py-3 font-medium">Reference</th>
                <th className="px-4 py-3 font-medium">Subject</th>
                <th className="px-4 py-3 font-medium">Submitted</th>
                <th className="px-4 py-3 font-medium">Current Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((document) => (
                <tr key={document.id} className="border-b last:border-0">
                  <td className="px-4 py-4 font-medium">{document.id}</td>
                  <td className="px-4 py-4">{document.subject}</td>
                  <td className="px-4 py-4 text-muted-foreground">{document.submitted}</td>
                  <td className="px-4 py-4"><StatusBadge status={document.status} /></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center text-muted-foreground">
                    No matching documents found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export function ClientSubmitDocument() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-1 text-sm font-medium text-primary">Client Portal</p>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Submit a Document</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Provide the document details and attach the files for review.
        </p>
      </div>
      <GuestOnlineForm
        backTo="/client/dashboard"
        backLabel="Back to dashboard"
        submitLabel="Submit Document"
        showHeaderBack
      />
    </div>
  );
}